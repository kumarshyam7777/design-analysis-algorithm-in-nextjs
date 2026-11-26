// utils/algorithmCode.ts

export const galeShapleyPython = `def gale_shapley(men_prefs, women_prefs):
    """
    Gale-Shapley algorithm for stable matching
    Time Complexity: O(n²)
    Space Complexity: O(n²)
    """
    n = len(men_prefs)
    free_men = list(range(n))
    proposal_index = [0] * n
    engaged = [-1] * n
    women_rank = [{man: idx for idx, man in enumerate(women_prefs[i])} 
                  for i in range(n)]
    
    while free_men:
        man = free_men[0]
        woman = men_prefs[man][proposal_index[man]]
        proposal_index[man] += 1
        
        if engaged[woman] == -1:
            engaged[woman] = man
            free_men.pop(0)
        else:
            current_man = engaged[woman]
            if women_rank[woman][man] < women_rank[woman][current_man]:
                engaged[woman] = man
                free_men.pop(0)
                free_men.append(current_man)
    
    return engaged

# Test
men_prefs = [[0,1,2], [1,0,2], [0,1,2]]
women_prefs = [[1,0,2], [0,1,2], [0,1,2]]
result = gale_shapley(men_prefs, women_prefs)
print("Stable matching:", result)`;

export const galeShapleyJava = `import java.util.*;

public class GaleShapley {
    public static int[] galeShapley(int[][] menPrefs, int[][] womenPrefs) {
        int n = menPrefs.length;
        Queue<Integer> freeMen = new LinkedList<>();
        for (int i = 0; i < n; i++) freeMen.add(i);
        
        int[] proposalIndex = new int[n];
        int[] engaged = new int[n];
        Arrays.fill(engaged, -1);
        
        int[][] womenRank = new int[n][n];
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                womenRank[i][womenPrefs[i][j]] = j;
            }
        }
        
        while (!freeMen.isEmpty()) {
            int man = freeMen.poll();
            int woman = menPrefs[man][proposalIndex[man]++];
            
            if (engaged[woman] == -1) {
                engaged[woman] = man;
            } else {
                int currentMan = engaged[woman];
                if (womenRank[woman][man] < womenRank[woman][currentMan]) {
                    engaged[woman] = man;
                    freeMen.add(currentMan);
                } else {
                    freeMen.add(man);
                }
            }
        }
        return engaged;
    }
}`;

export const selectionSortPython = `def selection_sort(arr):
    n = len(arr)
    for i in range(n):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr

# Test
arr = [64, 25, 12, 22, 11]
print("Sorted array:", selection_sort(arr.copy()))`;

export const selectionSortJava = `public class SelectionSort {
    public static void selectionSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            int minIdx = i;
            for (int j = i + 1; j < n; j++) {
                if (arr[j] < arr[minIdx]) {
                    minIdx = j;
                }
            }
            int temp = arr[minIdx];
            arr[minIdx] = arr[i];
            arr[i] = temp;
        }
    }
}`;

export const bfsPython = `from collections import deque

def bfs_reachable(graph, start):
    visited = set()
    queue = deque([start])
    visited.add(start)
    reachable_nodes = []
    
    while queue:
        vertex = queue.popleft()
        reachable_nodes.append(vertex)
        
        for neighbor in graph.get(vertex, []):
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
    
    return reachable_nodes

# Test
graph = {0: [1, 2], 1: [2], 2: [3], 3: [], 4: [0]}
print("Nodes reachable from 0:", bfs_reachable(graph, 0))`;

export const bfsJava = `import java.util.*;

public class BFSDigraph {
    public static List<Integer> bfsReachable(Map<Integer, List<Integer>> graph, int start) {
        Set<Integer> visited = new HashSet<>();
        Queue<Integer> queue = new LinkedList<>();
        List<Integer> reachable = new ArrayList<>();
        
        queue.add(start);
        visited.add(start);
        
        while (!queue.isEmpty()) {
            int vertex = queue.poll();
            reachable.add(vertex);
            
            for (int neighbor : graph.getOrDefault(vertex, new ArrayList<>())) {
                if (!visited.contains(neighbor)) {
                    visited.add(neighbor);
                    queue.add(neighbor);
                }
            }
        }
        return reachable;
    }
}`;

export const topologicalSortPython = `from collections import deque

def topological_sort_kahn(graph, vertices):
    indegree = {v: 0 for v in vertices}
    for v in vertices:
        for neighbor in graph.get(v, []):
            indegree[neighbor] += 1
    
    queue = deque([v for v in vertices if indegree[v] == 0])
    result = []
    
    while queue:
        vertex = queue.popleft()
        result.append(vertex)
        
        for neighbor in graph.get(vertex, []):
            indegree[neighbor] -= 1
            if indegree[neighbor] == 0:
                queue.append(neighbor)
    
    return result if len(result) == len(vertices) else None

# Test
graph = {0: [1, 2], 1: [3], 2: [3], 3: [4], 4: []}
vertices = [0, 1, 2, 3, 4]
print("Topological order:", topological_sort_kahn(graph, vertices))`;

export const topologicalSortJava = `import java.util.*;

public class TopologicalSort {
    public static List<Integer> topologicalSortKahn(Map<Integer, List<Integer>> graph, 
                                                     List<Integer> vertices) {
        Map<Integer, Integer> indegree = new HashMap<>();
        for (int v : vertices) indegree.put(v, 0);
        
        for (int v : vertices) {
            for (int neighbor : graph.getOrDefault(v, new ArrayList<>())) {
                indegree.put(neighbor, indegree.get(neighbor) + 1);
            }
        }
        
        Queue<Integer> queue = new LinkedList<>();
        for (int v : vertices) {
            if (indegree.get(v) == 0) queue.add(v);
        }
        
        List<Integer> result = new ArrayList<>();
        while (!queue.isEmpty()) {
            int vertex = queue.poll();
            result.add(vertex);
            
            for (int neighbor : graph.getOrDefault(vertex, new ArrayList<>())) {
                indegree.put(neighbor, indegree.get(neighbor) - 1);
                if (indegree.get(neighbor) == 0) queue.add(neighbor);
            }
        }
        
        return result.size() == vertices.size() ? result : null;
    }
}`;

export const kruskalPython = `class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [0] * n
    
    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]
    
    def union(self, x, y):
        px, py = self.find(x), self.find(y)
        if px == py:
            return False
        if self.rank[px] < self.rank[py]:
            self.parent[px] = py
        elif self.rank[px] > self.rank[py]:
            self.parent[py] = px
        else:
            self.parent[py] = px
            self.rank[px] += 1
        return True

def kruskal(vertices, edges):
    edges.sort(key=lambda x: x[2])
    uf = UnionFind(vertices)
    mst = []
    total_cost = 0
    
    for u, v, weight in edges:
        if uf.union(u, v):
            mst.append((u, v, weight))
            total_cost += weight
    
    return mst, total_cost

# Test
edges = [(0, 1, 10), (0, 2, 6), (0, 3, 5), (1, 3, 15), (2, 3, 4)]
mst, cost = kruskal(4, edges)
print("MST edges:", mst)
print("Total cost:", cost)`;

export const kruskalJava = `import java.util.*;

class Edge implements Comparable<Edge> {
    int src, dest, weight;
    Edge(int s, int d, int w) { src = s; dest = d; weight = w; }
    public int compareTo(Edge e) { return this.weight - e.weight; }
}

class UnionFind {
    int[] parent, rank;
    UnionFind(int n) {
        parent = new int[n];
        rank = new int[n];
        for (int i = 0; i < n; i++) parent[i] = i;
    }
    
    int find(int x) {
        if (parent[x] != x) parent[x] = find(parent[x]);
        return parent[x];
    }
    
    boolean union(int x, int y) {
        int px = find(x), py = find(y);
        if (px == py) return false;
        if (rank[px] < rank[py]) parent[px] = py;
        else if (rank[px] > rank[py]) parent[py] = px;
        else { parent[py] = px; rank[px]++; }
        return true;
    }
}

public class KruskalMST {
    public static List<Edge> kruskal(int vertices, List<Edge> edges) {
        Collections.sort(edges);
        UnionFind uf = new UnionFind(vertices);
        List<Edge> mst = new ArrayList<>();
        
        for (Edge e : edges) {
            if (uf.union(e.src, e.dest)) {
                mst.add(e);
            }
        }
        return mst;
    }
}`;

export const huffmanPython = `import heapq
from collections import Counter

class HuffmanNode:
    def __init__(self, char, freq):
        self.char = char
        self.freq = freq
        self.left = None
        self.right = None
    
    def __lt__(self, other):
        return self.freq < other.freq

def build_huffman_tree(text):
    freq = Counter(text)
    heap = [HuffmanNode(char, freq) for char, freq in freq.items()]
    heapq.heapify(heap)
    
    while len(heap) > 1:
        left = heapq.heappop(heap)
        right = heapq.heappop(heap)
        merged = HuffmanNode(None, left.freq + right.freq)
        merged.left = left
        merged.right = right
        heapq.heappush(heap, merged)
    
    return heap[0] if heap else None

def generate_codes(node, code="", codes=None):
    if codes is None:
        codes = {}
    if node is None:
        return codes
    if node.char is not None:
        codes[node.char] = code
    generate_codes(node.left, code + "0", codes)
    generate_codes(node.right, code + "1", codes)
    return codes

# Test
text = "huffman coding"
root = build_huffman_tree(text)
codes = generate_codes(root)
print("Huffman Codes:", codes)`;

export const huffmanJava = `import java.util.*;

class HuffmanNode implements Comparable<HuffmanNode> {
    char ch;
    int freq;
    HuffmanNode left, right;
    
    HuffmanNode(char c, int f) { ch = c; freq = f; }
    public int compareTo(HuffmanNode n) { return this.freq - n.freq; }
}

public class HuffmanCoding {
    public static HuffmanNode buildTree(Map<Character, Integer> freq) {
        PriorityQueue<HuffmanNode> pq = new PriorityQueue<>();
        for (Map.Entry<Character, Integer> e : freq.entrySet()) {
            pq.add(new HuffmanNode(e.getKey(), e.getValue()));
        }
        
        while (pq.size() > 1) {
            HuffmanNode left = pq.poll();
            HuffmanNode right = pq.poll();
            HuffmanNode parent = new HuffmanNode('\\0', left.freq + right.freq);
            parent.left = left;
            parent.right = right;
            pq.add(parent);
        }
        return pq.poll();
    }
}`;

export const parallelMergeSortPython = `import multiprocessing as mp
import time
import random

def merge(left, right):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result

def parallel_merge_sort(arr, depth=0, max_depth=3):
    if len(arr) <= 1:
        return arr
    
    mid = len(arr) // 2
    
    if depth < max_depth and mp.cpu_count() > 1:
        with mp.Pool(2) as pool:
            left_result = pool.apply_async(parallel_merge_sort, 
                                          (arr[:mid], depth+1, max_depth))
            right_result = pool.apply_async(parallel_merge_sort, 
                                           (arr[mid:], depth+1, max_depth))
            left, right = left_result.get(), right_result.get()
    else:
        left = parallel_merge_sort(arr[:mid], depth+1, max_depth)
        right = parallel_merge_sort(arr[mid:], depth+1, max_depth)
    
    return merge(left, right)`;

export const parallelMergeSortJava = `import java.util.concurrent.*;
import java.util.*;

class ParallelMergeSort extends RecursiveTask<int[]> {
    private int[] arr;
    private static final int THRESHOLD = 1000;
    
    ParallelMergeSort(int[] arr) { this.arr = arr; }
    
    @Override
    protected int[] compute() {
        if (arr.length <= THRESHOLD) {
            return sequentialMergeSort(arr);
        }
        
        int mid = arr.length / 2;
        ParallelMergeSort leftTask = new ParallelMergeSort(
            Arrays.copyOfRange(arr, 0, mid));
        ParallelMergeSort rightTask = new ParallelMergeSort(
            Arrays.copyOfRange(arr, mid, arr.length));
        
        leftTask.fork();
        int[] right = rightTask.compute();
        int[] left = leftTask.join();
        
        return merge(left, right);
    }
    
    private int[] sequentialMergeSort(int[] arr) {
        if (arr.length <= 1) return arr;
        int mid = arr.length / 2;
        int[] left = sequentialMergeSort(Arrays.copyOfRange(arr, 0, mid));
        int[] right = sequentialMergeSort(Arrays.copyOfRange(arr, mid, arr.length));
        return merge(left, right);
    }
    
    private int[] merge(int[] left, int[] right) {
        int[] result = new int[left.length + right.length];
        int i = 0, j = 0, k = 0;
        while (i < left.length && j < right.length) {
            if (left[i] <= right[j]) result[k++] = left[i++];
            else result[k++] = right[j++];
        }
        while (i < left.length) result[k++] = left[i++];
        while (j < right.length) result[k++] = right[j++];
        return result;
    }
}`;

export const intervalSchedulingPython = `def interval_scheduling(intervals):
    intervals.sort(key=lambda x: x[1])
    selected = []
    last_finish = float('-inf')
    
    for start, finish in intervals:
        if start >= last_finish:
            selected.append((start, finish))
            last_finish = finish
    
    return selected

def weighted_interval_scheduling(intervals):
    intervals.sort(key=lambda x: x[1])
    n = len(intervals)
    start = [i[0] for i in intervals]
    finish = [i[1] for i in intervals]
    weight = [i[2] for i in intervals]
    
    def find_last_non_conflict(index):
        low, high = 0, index - 1
        while low <= high:
            mid = (low + high) // 2
            if finish[mid] <= start[index]:
                if finish[mid + 1] <= start[index]:
                    low = mid + 1
                else:
                    return mid
            else:
                high = mid - 1
        return -1
    
    dp = [0] * n
    dp[0] = weight[0]
    
    for i in range(1, n):
        include = weight[i]
        last = find_last_non_conflict(i)
        if last != -1:
            include += dp[last]
        dp[i] = max(include, dp[i-1])
    
    return dp[n-1]

# Test
intervals = [(1, 3), (2, 5), (3, 9), (6, 8)]
print("Maximum intervals:", len(interval_scheduling(intervals)))`;

export const intervalSchedulingJava = `import java.util.*;

class Interval implements Comparable<Interval> {
    int start, finish, weight;
    Interval(int s, int f) { start = s; finish = f; weight = 1; }
    Interval(int s, int f, int w) { start = s; finish = f; weight = w; }
    public int compareTo(Interval o) { return this.finish - o.finish; }
}

public class IntervalScheduling {
    public static List<Interval> unweightedSchedule(List<Interval> intervals) {
        Collections.sort(intervals);
        List<Interval> selected = new ArrayList<>();
        int lastFinish = Integer.MIN_VALUE;
        
        for (Interval i : intervals) {
            if (i.start >= lastFinish) {
                selected.add(i);
                lastFinish = i.finish;
            }
        }
        return selected;
    }
}`;

export const dijkstraPython = `import heapq

def dijkstra(graph, start):
    distances = {node: float('inf') for node in graph}
    distances[start] = 0
    pq = [(0, start)]
    visited = set()
    previous = {node: None for node in graph}
    
    while pq:
        current_dist, current = heapq.heappop(pq)
        
        if current in visited:
            continue
        visited.add(current)
        
        if current_dist > distances[current]:
            continue
        
        for neighbor, weight in graph[current].items():
            distance = current_dist + weight
            if distance < distances[neighbor]:
                distances[neighbor] = distance
                previous[neighbor] = current
                heapq.heappush(pq, (distance, neighbor))
    
    return distances, previous

# Test
graph = {
    'A': {'B': 1, 'C': 4},
    'B': {'A': 1, 'C': 2, 'D': 5},
    'C': {'A': 4, 'B': 2, 'D': 1},
    'D': {'B': 5, 'C': 1}
}
distances, _ = dijkstra(graph, 'A')
print("Shortest distances from A:", distances)`;

export const dijkstraJava = `import java.util.*;

class Node implements Comparable<Node> {
    int id, dist;
    Node(int i, int d) { id = i; dist = d; }
    public int compareTo(Node n) { return this.dist - n.dist; }
}

public class Dijkstra {
    public static int[] dijkstra(List<List<int[]>> graph, int start) {
        int n = graph.size();
        int[] dist = new int[n];
        Arrays.fill(dist, Integer.MAX_VALUE);
        dist[start] = 0;
        
        PriorityQueue<Node> pq = new PriorityQueue<>();
        pq.add(new Node(start, 0));
        boolean[] visited = new boolean[n];
        
        while (!pq.isEmpty()) {
            Node curr = pq.poll();
            if (visited[curr.id]) continue;
            visited[curr.id] = true;
            
            for (int[] edge : graph.get(curr.id)) {
                int neighbor = edge[0], weight = edge[1];
                if (!visited[neighbor] && dist[curr.id] + weight < dist[neighbor]) {
                    dist[neighbor] = dist[curr.id] + weight;
                    pq.add(new Node(neighbor, dist[neighbor]));
                }
            }
        }
        return dist;
    }
}`;

export const knapsackPython = `def knapsack_01(weights, values, capacity):
    n = len(weights)
    dp = [[0] * (capacity + 1) for _ in range(n + 1)]
    
    for i in range(1, n + 1):
        for w in range(1, capacity + 1):
            if weights[i-1] <= w:
                dp[i][w] = max(values[i-1] + dp[i-1][w - weights[i-1]], 
                              dp[i-1][w])
            else:
                dp[i][w] = dp[i-1][w]
    
    return dp[n][capacity]

def knapsack_01_optimized(weights, values, capacity):
    dp = [0] * (capacity + 1)
    
    for i in range(len(weights)):
        for w in range(capacity, weights[i] - 1, -1):
            dp[w] = max(dp[w], values[i] + dp[w - weights[i]])
    
    return dp[capacity]

# Test
weights = [2, 3, 4, 5]
values = [3, 4, 5, 6]
capacity = 5
print("Maximum value:", knapsack_01(weights, values, capacity))`;

export const knapsackJava = `public class Knapsack {
    public static int knapsack01(int[] weights, int[] values, int capacity) {
        int n = weights.length;
        int[][] dp = new int[n + 1][capacity + 1];
        
        for (int i = 1; i <= n; i++) {
            for (int w = 1; w <= capacity; w++) {
                if (weights[i-1] <= w) {
                    dp[i][w] = Math.max(values[i-1] + dp[i-1][w - weights[i-1]], 
                                       dp[i-1][w]);
                } else {
                    dp[i][w] = dp[i-1][w];
                }
            }
        }
        return dp[n][capacity];
    }
    
    public static int knapsack01Optimized(int[] weights, int[] values, int capacity) {
        int[] dp = new int[capacity + 1];
        
        for (int i = 0; i < weights.length; i++) {
            for (int w = capacity; w >= weights[i]; w--) {
                dp[w] = Math.max(dp[w], values[i] + dp[w - weights[i]]);
            }
        }
        return dp[capacity];
    }
}`;