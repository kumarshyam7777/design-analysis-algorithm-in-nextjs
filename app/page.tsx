// app/page.tsx
'use client';

import React, { useState } from 'react';
import { 
  galeShapleyPython, galeShapleyJava,
  selectionSortPython, selectionSortJava,
  bfsPython, bfsJava,
  topologicalSortPython, topologicalSortJava,
  kruskalPython, kruskalJava,
  huffmanPython, huffmanJava,
  parallelMergeSortPython, parallelMergeSortJava,
  intervalSchedulingPython, intervalSchedulingJava,
  dijkstraPython, dijkstraJava,
  knapsackPython, knapsackJava
} from './utils/algorithmCode';

interface CodeTab {
  id: string;
  language: 'python' | 'java';
  label: string;
  code: string;
  icon: string;
}

interface Algorithm {
  id: string;
  title: string;
  description: string;
  complexity: {
    [key: string]: string;
  };
  codeTabs: CodeTab[];
  keyPoints: string[];
  javaNote?: string;
}

const algorithms: Algorithm[] = [
  {
    id: 'gale-shapley',
    title: '1️⃣ Gale-Shapley Algorithm (Stable Matching)',
    description: 'The Gale-Shapley algorithm solves the stable marriage problem where we have equal numbers of men and women, each with their own preference lists. The algorithm produces a stable matching where no unmatched pair would prefer each other over their current partners.',
    complexity: {
      'Time Complexity (All Cases)': 'O(n²)',
      'Space Complexity': 'O(n²)'
    },
    codeTabs: [
      { id: 'python1', language: 'python', label: '🐍 Python', code: galeShapleyPython, icon: '🐍' },
      { id: 'java1', language: 'java', label: '☕ Java', code: galeShapleyJava, icon: '☕' }
    ],
    keyPoints: [
      'Always produces a stable matching',
      'Man-optimal: Each man gets the best possible partner among all stable matchings',
      'Woman-pessimal: Each woman gets the worst possible partner among all stable matchings',
      'Running time is O(n²) regardless of input',
      'Can be extended to hospital-resident matching problem'
    ],
    javaNote: 'Uses Queue interface with LinkedList for free men management. Women\'s preference ranks stored in 2D array for O(1) lookup. Arrays.fill() for initialization.'
  },
  {
    id: 'selection-sort',
    title: '2️⃣ Selection Sort',
    description: 'Selection sort is an in-place comparison sorting algorithm that divides the input list into sorted and unsorted regions. It repeatedly selects the smallest element from the unsorted region and swaps it with the first element of the unsorted region.',
    complexity: {
      'Best Case Time': 'O(n²)',
      'Average Case Time': 'O(n²)',
      'Worst Case Time': 'O(n²)',
      'Space Complexity': 'O(1)'
    },
    codeTabs: [
      { id: 'python2', language: 'python', label: '🐍 Python', code: selectionSortPython, icon: '🐍' },
      { id: 'java2', language: 'java', label: '☕ Java', code: selectionSortJava, icon: '☕' }
    ],
    keyPoints: [
      'In-place algorithm: No extra space required',
      'Unstable sort: Does not preserve relative order of equal elements',
      'Performs minimum number of swaps: O(n) swaps',
      'Good for small datasets or when memory is limited',
      'Always O(n²) regardless of input order'
    ],
    javaNote: 'Generic implementation using Comparable interface for flexibility. In-place sorting modifies original array. Uses primitive int for efficiency or generic for objects.'
  },
  {
    id: 'bfs',
    title: '3️⃣ BFS in Directed Graph',
    description: 'Breadth-First Search (BFS) is a graph traversal algorithm that explores vertices in order of their distance from the source node. It uses a queue data structure and is particularly useful for finding shortest paths in unweighted graphs.',
    complexity: {
      'Time Complexity': 'O(V + E)',
      'Space Complexity': 'O(V)'
    },
    codeTabs: [
      { id: 'python3', language: 'python', label: '🐍 Python', code: bfsPython, icon: '🐍' },
      { id: 'java3', language: 'java', label: '☕ Java', code: bfsJava, icon: '☕' }
    ],
    keyPoints: [
      'Uses queue data structure (FIFO)',
      'Finds shortest path in unweighted graphs',
      'Can detect if graph is bipartite',
      'Used in web crawling, social networks, GPS navigation',
      'Memory requirement is O(V) for storing visited nodes'
    ],
    javaNote: 'Uses HashMap for adjacency list, HashSet for visited tracking. LinkedList for queue operations. Path tracking stores complete paths for shortest path finding.'
  },
  {
    id: 'topological',
    title: '4️⃣ Topological Ordering',
    description: 'Topological ordering of a Directed Acyclic Graph (DAG) is a linear ordering of vertices such that for every directed edge (u,v), vertex u comes before v in the ordering. Kahn\'s algorithm uses indegree counts to achieve this ordering.',
    complexity: {
      'Time Complexity': 'O(V + E)',
      'Space Complexity': 'O(V)'
    },
    codeTabs: [
      { id: 'python4', language: 'python', label: '🐍 Python', code: topologicalSortPython, icon: '🐍' },
      { id: 'java4', language: 'java', label: '☕ Java', code: topologicalSortJava, icon: '☕' }
    ],
    keyPoints: [
      'Only possible for Directed Acyclic Graphs (DAGs)',
      'Multiple valid topological orders may exist',
      'Can detect cycles in directed graphs',
      'Used in scheduling, dependency resolution, course prerequisites',
      'Kahn\'s algorithm uses indegree concept'
    ],
    javaNote: 'Two implementations: Kahn\'s algorithm (queue-based) and DFS-based. Uses HashMap for indegree tracking, Stack for DFS approach. Handles cycle detection.'
  },
  {
    id: 'kruskal',
    title: '5️⃣ Kruskal\'s Algorithm (Minimum Spanning Tree)',
    description: 'Kruskal\'s algorithm finds the Minimum Spanning Tree (MST) of a connected undirected graph by repeatedly adding the smallest edge that doesn\'t create a cycle. It uses Union-Find data structure for cycle detection.',
    complexity: {
      'Time Complexity': 'O(E log E) or O(E log V)',
      'Space Complexity': 'O(V + E)'
    },
    codeTabs: [
      { id: 'python5', language: 'python', label: '🐍 Python', code: kruskalPython, icon: '🐍' },
      { id: 'java5', language: 'java', label: '☕ Java', code: kruskalJava, icon: '☕' }
    ],
    keyPoints: [
      'Greedy algorithm - always picks smallest edge',
      'Uses Union-Find for cycle detection',
      'Works for disconnected graphs (produces forest)',
      'Time dominated by sorting edges',
      'Prim\'s algorithm is alternative for dense graphs'
    ],
    javaNote: 'Edge class implements Comparable for sorting. UnionFind with path compression and union by rank for optimal performance. Collections.sort() for edge sorting.'
  },
  {
    id: 'huffman',
    title: '6️⃣ Huffman Coding',
    description: 'Huffman coding is a lossless data compression algorithm that assigns variable-length codes to characters based on their frequencies. More frequent characters get shorter codes, achieving optimal prefix-free encoding.',
    complexity: {
      'Time Complexity': 'O(n log n)',
      'Space Complexity': 'O(n)'
    },
    codeTabs: [
      { id: 'python6', language: 'python', label: '🐍 Python', code: huffmanPython, icon: '🐍' },
      { id: 'java6', language: 'java', label: '☕ Java', code: huffmanJava, icon: '☕' }
    ],
    keyPoints: [
      'Optimal prefix-free encoding',
      'Greedy algorithm - always picks smallest frequencies',
      'Used in ZIP, JPEG, MP3 compression',
      'No codeword is prefix of another',
      'Tree is full binary tree (all internal nodes have 2 children)'
    ],
    javaNote: 'PriorityQueue for min-heap implementation. HashMap for frequency counting and code storage. Includes encode and decode functionality.'
  },
  {
    id: 'parallel-merge-sort',
    title: '7️⃣ Parallel Merge Sort',
    description: 'Parallel merge sort divides the array into smaller subarrays that are sorted concurrently using multiple processors or threads. The divide-and-conquer nature of merge sort makes it naturally parallelizable.',
    complexity: {
      'Sequential Time': 'O(n log n)',
      'Parallel Time': 'O((n log n)/p)',
      'Space Complexity': 'O(n)'
    },
    codeTabs: [
      { id: 'python7', language: 'python', label: '🐍 Python', code: parallelMergeSortPython, icon: '🐍' },
      { id: 'java7', language: 'java', label: '☕ Java', code: parallelMergeSortJava, icon: '☕' }
    ],
    keyPoints: [
      'Divide-and-conquer algorithm',
      'Fork/Join framework in Java, multiprocessing in Python',
      'Speedup depends on number of processors',
      'Amdahl\'s law: speedup limited by sequential portion',
      'Load balancing important for efficiency'
    ],
    javaNote: 'ForkJoinPool with RecursiveTask for parallel processing. THRESHOLD determines when to switch to sequential. Uses Java\'s concurrency framework for optimal performance.'
  },
  {
    id: 'interval-scheduling',
    title: '8️⃣ Interval Scheduling',
    description: 'Interval scheduling problem: Given a set of intervals with start and finish times, select the maximum number of non-overlapping intervals. The greedy algorithm that selects intervals with earliest finish time is optimal.',
    complexity: {
      'Unweighted Time': 'O(n log n)',
      'Weighted Time': 'O(n log n)',
      'Space Complexity': 'O(n)'
    },
    codeTabs: [
      { id: 'python8', language: 'python', label: '🐍 Python', code: intervalSchedulingPython, icon: '🐍' },
      { id: 'java8', language: 'java', label: '☕ Java', code: intervalSchedulingJava, icon: '☕' }
    ],
    keyPoints: [
      'Greedy algorithm optimal for unweighted case',
      'Earliest finish time gives optimal solution',
      'Weighted version requires dynamic programming',
      'Applications: task scheduling, resource allocation',
      'Can be extended to interval partitioning'
    ],
    javaNote: 'Interval class implements Comparable for sorting. Binary search for finding non-conflicting intervals. Two versions: greedy (unweighted) and DP (weighted).'
  },
  {
    id: 'dijkstra',
    title: '9️⃣ Dijkstra\'s Algorithm',
    description: 'Dijkstra\'s algorithm finds the shortest paths from a source vertex to all other vertices in a weighted graph with non-negative edge weights. It uses a greedy approach with a priority queue.',
    complexity: {
      'Time Complexity': 'O((V + E) log V)',
      'Space Complexity': 'O(V)'
    },
    codeTabs: [
      { id: 'python9', language: 'python', label: '🐍 Python', code: dijkstraPython, icon: '🐍' },
      { id: 'java9', language: 'java', label: '☕ Java', code: dijkstraJava, icon: '☕' }
    ],
    keyPoints: [
      'Works only with non-negative edge weights',
      'Greedy algorithm: always picks closest unvisited vertex',
      'Can be implemented with binary heap for efficiency',
      'Does not work with negative weights (use Bellman-Ford)',
      'Applications: GPS navigation, network routing'
    ],
    javaNote: 'PriorityQueue for min-heap. Node class implements Comparable. Adjacency list representation with int[] arrays for edges. Path reconstruction using prev array.'
  },
  {
    id: 'knapsack',
    title: '🔟 0/1 Knapsack using Dynamic Programming',
    description: 'The 0/1 knapsack problem: Given items with weights and values, and a knapsack with capacity W, select items to maximize total value where each item can be taken at most once. DP solution uses optimal substructure property.',
    complexity: {
      'Time Complexity': 'O(n × W)',
      'Space Complexity (2D)': 'O(n × W)',
      'Space Complexity (1D)': 'O(W)'
    },
    codeTabs: [
      { id: 'python10', language: 'python', label: '🐍 Python', code: knapsackPython, icon: '🐍' },
      { id: 'java10', language: 'java', label: '☕ Java', code: knapsackJava, icon: '☕' }
    ],
    keyPoints: [
      'Classic dynamic programming problem',
      'Optimal substructure: solution depends on subproblems',
      'Overlapping subproblems: DP table stores results',
      'Space optimization: iterate capacity backwards',
      'Not polynomial-time (pseudo-polynomial)',
      'Greedy fails for 0/1 knapsack'
    ],
    javaNote: 'Two implementations: 2D DP and space-optimized 1D DP. KnapsackResult class for returning both value and items. Iterate capacity backwards for 1D version.'
  }
];

const AlgorithmCard: React.FC<{ algorithm: Algorithm }> = ({ algorithm }) => {
  const [activeTab, setActiveTab] = useState(algorithm.codeTabs[0].id);

  return (
    <div className="algorithm-card">
      <h2 className="text-2xl font-bold text-purple-600 mb-4">{algorithm.title}</h2>
      <p className="text-gray-700 mb-4">{algorithm.description}</p>
      
      <div className="complexity-box">
        <h3 className="font-semibold text-lg mb-2">⏱️ Time & Space Complexity</h3>
        <table className="w-full">
          <tbody>
            {Object.entries(algorithm.complexity).map(([key, value]) => (
              <tr key={key} className="border-b border-blue-200">
                <td className="py-2 font-medium">{key}</td>
                <td className="py-2">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="my-5">
        <div className="flex gap-2 border-b border-gray-200 mb-3">
          {algorithm.codeTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 font-semibold transition-all ${
                activeTab === tab.id
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        
        {algorithm.codeTabs.map((tab) => (
          <div
            key={tab.id}
            className={activeTab === tab.id ? 'block' : 'hidden'}
          >
            <pre className="code-block">
              <code>{tab.code}</code>
            </pre>
            {tab.language === 'java' && algorithm.javaNote && (
              <div className="java-note">
                <strong>☕ Java Notes:</strong> {algorithm.javaNote}
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="key-points-box">
        <h3 className="font-semibold text-lg text-orange-600 mb-2">📌 Key Points for Exam</h3>
        <ul className="list-disc ml-5 space-y-1">
          {algorithm.keyPoints.map((point, idx) => (
            <li key={idx}>{point}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const ComplexityTable: React.FC = () => {
  const complexityData = [
    { algorithm: 'Gale-Shapley', best: 'O(n²)', avg: 'O(n²)', worst: 'O(n²)', space: 'O(n²)' },
    { algorithm: 'Selection Sort', best: 'O(n²)', avg: 'O(n²)', worst: 'O(n²)', space: 'O(1)' },
    { algorithm: 'BFS', best: 'O(V+E)', avg: 'O(V+E)', worst: 'O(V+E)', space: 'O(V)' },
    { algorithm: 'Topological Sort', best: 'O(V+E)', avg: 'O(V+E)', worst: 'O(V+E)', space: 'O(V)' },
    { algorithm: "Kruskal's MST", best: 'O(E log E)', avg: 'O(E log E)', worst: 'O(E log E)', space: 'O(V+E)' },
    { algorithm: 'Huffman Coding', best: 'O(n log n)', avg: 'O(n log n)', worst: 'O(n log n)', space: 'O(n)' },
    { algorithm: 'Parallel Merge Sort', best: 'O(n log n/p)', avg: 'O(n log n/p)', worst: 'O(n log n/p)', space: 'O(n)' },
    { algorithm: 'Interval Scheduling', best: 'O(n log n)', avg: 'O(n log n)', worst: 'O(n log n)', space: 'O(n)' },
    { algorithm: "Dijkstra's", best: 'O((V+E)log V)', avg: 'O((V+E)log V)', worst: 'O((V+E)log V)', space: 'O(V)' },
    { algorithm: '0/1 Knapsack', best: 'O(nW)', avg: 'O(nW)', worst: 'O(nW)', space: 'O(nW)' },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-purple-600 text-white">
            <th className="p-3 text-left">Algorithm</th>
            <th className="p-3 text-left">Best Case</th>
            <th className="p-3 text-left">Average Case</th>
            <th className="p-3 text-left">Worst Case</th>
            <th className="p-3 text-left">Space</th>
          </tr>
        </thead>
        <tbody>
          {complexityData.map((item, idx) => (
            <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="p-3 font-medium">{item.algorithm}</td>
              <td className="p-3">{item.best}</td>
              <td className="p-3">{item.avg}</td>
              <td className="p-3">{item.worst}</td>
              <td className="p-3">{item.space}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default function Home() {
  return (
    <div className="min-h-screen">
      <header className="bg-linear-to-r from-purple-600 to-purple-800 text-white py-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-2">📚 Algorithms Complete Reference Guide</h1>
        <p className="text-xl">10 Essential Algorithms with Python & Java Implementations</p>
        <p className="text-lg opacity-90">Comprehensive Exam Preparation Notes</p>
      </header>
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-gray-50 rounded-lg p-6 mb-8 shadow-sm">
          <h2 className="text-2xl font-bold text-purple-600 mb-4">📑 Table of Contents</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {algorithms.map((algo) => (
              <a
                key={algo.id}
                href={`#${algo.id}`}
                className="text-gray-700 hover:text-purple-600 transition-colors"
              >
                {algo.title}
              </a>
            ))}
          </div>
        </div>
        
        {algorithms.map((algorithm) => (
          <div key={algorithm.id} id={algorithm.id}>
            <AlgorithmCard algorithm={algorithm} />
          </div>
        ))}
        
        {/* Comprehensive Summary */}
        <div className="bg-linear-to-r from-gray-50 to-gray-100 rounded-lg p-6 my-8 shadow-lg">
          <h2 className="text-2xl font-bold text-purple-600 mb-4">📊 Comprehensive Complexity Summary</h2>
          
          <h3 className="text-xl font-semibold mb-3">Time Complexity Comparison Table</h3>
          <ComplexityTable />
          
          <h3 className="text-xl font-semibold mt-6 mb-3">🎯 Algorithm Selection Guide</h3>
          <ul className="list-disc ml-5 space-y-2 mb-6">
            <li><strong>Stable Matching</strong>: Use Gale-Shapley for pairing problems</li>
            <li><strong>Small Arrays</strong>: Selection sort for memory-constrained environments</li>
            <li><strong>Graph Traversal</strong>: BFS for unweighted shortest paths</li>
            <li><strong>Dependency Resolution</strong>: Topological sort for DAGs</li>
            <li><strong>Network Design</strong>: Kruskal&apos;s for MST in sparse graphs</li>
            <li><strong>Data Compression</strong>: Huffman coding for lossless compression</li>
            <li><strong>Large Datasets</strong>: Parallel merge sort for multi-core systems</li>
            <li><strong>Scheduling</strong>: Interval scheduling for task selection</li>
            <li><strong>Shortest Path</strong>: Dijkstra for non-negative weights</li>
            <li><strong>Resource Allocation</strong>: DP knapsack for optimization</li>
          </ul>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">📝 Common Exam Questions</h3>
          <ol className="list-decimal ml-5 space-y-2 mb-6">
            <li>Prove that Gale-Shapley produces stable matching</li>
            <li>Why is selection sort not adaptive?</li>
            <li>When to use BFS vs DFS?</li>
            <li>Why does topological sort only work on DAGs?</li>
            <li>Compare Kruskal and Prim&apos;s algorithms</li>
            <li>Why is Huffman coding optimal?</li>
            <li>Speedup analysis for parallel algorithms (Amdahl&apos;s Law)</li>
            <li>Prove greedy choice property for interval scheduling</li>
            <li>Why Dijkstra fails with negative weights?</li>
            <li>Difference between 0/1 and fractional knapsack</li>
          </ol>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">🔑 Important Formulas</h3>
          <ul className="list-disc ml-5 space-y-2 mb-6">
            <li><strong>Union-Find</strong>: α(n) - inverse Ackermann function (nearly constant)</li>
            <li><strong>Amdahl&apos;s Law</strong>: S = 1 / ((1-P) + P/N) where P is parallel portion, N is processors</li>
            <li><strong>Master Theorem</strong>: T(n) = aT(n/b) + f(n)</li>
            <li><strong>BFS Distance</strong>: d(v) = d(u) + 1 for edge (u,v)</li>
            <li><strong>Dijkstra Invariant</strong>: dist[u] ≤ dist[v] for processed vertices</li>
            <li><strong>Knapsack Recurrence</strong>: dp[i][w] = max(dp[i-1][w], val[i] + dp[i-1][w-wt[i]])</li>
          </ul>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">☕ Java-Specific Notes</h3>
          <ul className="list-disc ml-5 space-y-2">
            <li><strong>Collections Framework</strong>: ArrayList, HashMap, HashSet, PriorityQueue, LinkedList</li>
            <li><strong>Concurrency</strong>: ForkJoinPool, RecursiveTask, ExecutorService for parallel processing</li>
            <li><strong>Comparable/Comparator</strong>: Used for sorting custom objects</li>
            <li><strong>Generics</strong>: Type-safe implementations for sorting algorithms</li>
            <li><strong>Memory Management</strong>: Java automatically manages memory with garbage collection</li>
            <li><strong>Stream API</strong>: Can be used for functional-style operations on collections</li>
          </ul>
        </div>
        
        <footer className="text-center py-8 text-gray-500 border-t">
          <p>📖 Complete Reference Guide - All Algorithms with Python & Java Implementations</p>
          <p>✅ Perfect for Exam Preparation</p>
          <p>🎓 Study Smart, Excel in Exams!</p>
        </footer>
      </div>
    </div>
  );
}