import numpy as np
import matplotlib.pyplot as plt
from scipy.optimize import minimize

class CloudGameTheoreticModels:
    """Game Theoretic Model for Cloud Resource Allocation"""

    def __init__(self, n_providers=3, max_vms=20):
        self.n = n_providers
        self.max_vms = max_vms
        # Assign different cost parameters for each provider
        self.provider_params = [
            {'F_f': 40, 'F_uf': 4},
            {'F_f': 50, 'F_uf': 5},
            {'F_f': 60, 'F_uf': 6}
        ]

    def price_function(self, total_vms):
        """Pricing model based on total VMs allocated"""
        return max(100 - 1.5 * total_vms, 20)

    def nc_utility(self, s_o, total_vms, provider_index=0):
        """Utility function for a provider"""
        params = self.provider_params[provider_index]
        return s_o * self.price_function(total_vms) - params['F_f'] - s_o * params['F_uf']

    def best_response(self, s_other, provider_index):
        """Best Response strategy calculation"""
        return max(range(self.max_vms + 1),
                   key=lambda s_o: self.nc_utility(s_o, s_o + s_other, provider_index))

    def find_nash_equilibrium(self, max_iter=100):
        """Finding Nash Equilibrium strategies"""
        strategies = np.random.randint(0, self.max_vms // 2, self.n)
        for _ in range(max_iter):
            new_strategies = [
                self.best_response(sum(strategies) - s, i)
                for i, s in enumerate(strategies)
            ]
            if np.allclose(strategies, new_strategies):
                break
            strategies = new_strategies
        return strategies

    def bg_objective(self, x):
        """Bargaining Objective Function"""
        s1, s2 = x
        total = s1 + s2
        u1 = self.nc_utility(s1, total, 0)
        u2 = self.nc_utility(s2, total, 1)
        return -u1 * u2

    def solve_bargaining(self):
        """Solving Nash Bargaining Problem"""
        res = minimize(self.bg_objective, x0=[5, 5], bounds=[(0, self.max_vms), (0, self.max_vms)])
        return res.x

    def queue_simulation(self, arrival_rate=10, service_rate=2, servers=3, buffer=2):
        """M/M/s/K Queue Simulation"""
        rho = arrival_rate / (servers * service_rate)
        if rho >= 1:
            raise ValueError("Unstable system: Load > Capacity")

        pi = [1.0]
        for k in range(1, servers + buffer + 1):
            if k < servers:
                pi.append(pi[-1] * (arrival_rate / (k * service_rate)))
            else:
                pi.append(pi[-1] * (arrival_rate / (servers * service_rate)))

        total = sum(pi)
        pi = [p / total for p in pi]
        avg_queue = sum((k - servers) * pi[k] for k in range(servers, servers + buffer + 1))
        return avg_queue

# --- Visualization Functions ---

def plot_nash_equilibrium(eq):
    plt.figure(figsize=(8, 5))
    bars = plt.bar(range(len(eq)), eq, color='skyblue')
    plt.xlabel('Provider')
    plt.ylabel('Allocated VMs')
    plt.title('Nash Equilibrium VM Allocation')
    plt.grid(axis='y', linestyle='--', alpha=0.7)
    for bar in bars:
        yval = bar.get_height()
        plt.text(bar.get_x() + 0.2, yval + 0.5, f'{int(yval)}', fontsize=10)
    plt.show()

def plot_price_function(model):
    vms = np.arange(0, model.max_vms * model.n)
    prices = [model.price_function(vm) for vm in vms]
    plt.figure(figsize=(8, 5))
    plt.plot(vms, prices, color='darkorange', linewidth=2)
    plt.xlabel('Total VMs Allocated')
    plt.ylabel('Price per VM')
    plt.title('Price Function')
    plt.grid()
    plt.show()

def plot_provider_utilities(model, nash_eq):
    total_vms = sum(nash_eq)
    utilities = [model.nc_utility(s, total_vms, i) for i, s in enumerate(nash_eq)]
    bars = plt.bar(range(model.n), utilities, color='lightgreen')
    plt.xlabel('Provider')
    plt.ylabel('Utility')
    plt.title('Provider Utilities at Nash Equilibrium')
    plt.grid(axis='y', linestyle='--', alpha=0.7)
    for bar in bars:
        yval = bar.get_height()
        plt.text(bar.get_x() + 0.15, yval + 1, f'{yval:.1f}', fontsize=10)
    plt.show()

def plot_utility_vs_vms(model):
    vm_range = range(0, model.max_vms + 1)
    plt.figure(figsize=(10, 6))
    for idx in range(model.n):
        utilities = [model.nc_utility(s, s + 10, idx) for s in vm_range]
        plt.plot(vm_range, utilities, label=f'Provider {idx + 1}')
    plt.xlabel('VMs Allocated by Provider')
    plt.ylabel('Utility')
    plt.title('Utility vs VMs Allocated (Assuming Others Allocate 10)')
    plt.legend()
    plt.grid(True)
    plt.show()

def plot_cost_breakdown(model, nash_eq):
    total_vms = sum(nash_eq)
    revenues, fixed_costs, usage_costs = [], [], []
    for i, s in enumerate(nash_eq):
        price = model.price_function(total_vms)
        revenue = s * price
        f_cost = model.provider_params[i]['F_f']
        u_cost = s * model.provider_params[i]['F_uf']
        revenues.append(revenue)
        fixed_costs.append(f_cost)
        usage_costs.append(u_cost)

    x = np.arange(model.n)
    width = 0.3
    plt.figure(figsize=(10, 6))
    plt.bar(x, revenues, width, label='Revenue', color='lightblue')
    plt.bar(x, usage_costs, width, bottom=fixed_costs, label='Usage Cost', color='salmon')
    plt.bar(x, fixed_costs, width, label='Fixed Cost', color='gray')
    plt.xlabel('Provider')
    plt.ylabel('Value')
    plt.title('Revenue and Cost Breakdown per Provider')
    plt.xticks(x, [f'P{i+1}' for i in x])
    plt.legend()
    plt.grid(True)
    plt.show()

# --- Run Simulation ---

def run_simulation():
    model = CloudGameTheoreticModels(n_providers=3)
    print("\n--- Cloud Resource Allocation Simulation ---\n")
    for i, p in enumerate(model.provider_params):
        print(f"Provider {i + 1}: Fixed Cost = {p['F_f']}, Usage Cost per VM = {p['F_uf']}")

    nash_eq = model.find_nash_equilibrium()
    print(f"\nNash Equilibrium Strategies (VM Allocation per Provider): {nash_eq}")
    
    total_vms = sum(nash_eq)
    for idx, vms in enumerate(nash_eq):
        util = model.nc_utility(vms, total_vms, idx)
        print(f"Provider {idx + 1} Utility: {util:.2f}")

    plot_nash_equilibrium(nash_eq)
    plot_provider_utilities(model, nash_eq)
    plot_cost_breakdown(model, nash_eq)
    plot_utility_vs_vms(model)

    bargain_sol = model.solve_bargaining()
    print(f"\nBargaining Solution (Optimal VMs for Provider 1 & 2): {bargain_sol}")

    avg_queue = model.queue_simulation(arrival_rate=4, service_rate=5)
    print(f"\nAverage Queue Length in System: {avg_queue:.2f}")

    plot_price_function(model)

# Run the Complete Simulation
run_simulation()
