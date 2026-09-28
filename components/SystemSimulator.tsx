/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Server, Activity, ShieldCheck, Zap, Database, ArrowRight, RefreshCw, AlertTriangle } from 'lucide-react';

export const SystemSimulator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'scheduler' | 'search'>('scheduler');

  // Scheduler state
  const [nodes, setNodes] = useState([
    { id: 'worker-1', role: 'LEADER', status: 'HEALTHY', tasksExecuted: 248, cpuLoad: 68 },
    { id: 'worker-2', role: 'FOLLOWER', status: 'HEALTHY', tasksExecuted: 182, cpuLoad: 45 },
    { id: 'worker-3', role: 'FOLLOWER', status: 'HEALTHY', tasksExecuted: 194, cpuLoad: 52 },
    { id: 'worker-4', role: 'FOLLOWER', status: 'HEALTHY', tasksExecuted: 156, cpuLoad: 39 },
  ]);
  const [electionLogs, setElectionLogs] = useState<string[]>([
    '[INIT] etcd consensus cluster established. Lease TTL: 3000ms',
    '[LEADER] worker-1 acquired distributed mutex lock /sched/leader',
    '[HEARTBEAT] 500+ concurrent task workers healthy at 99.5% completion',
  ]);
  const [isElecting, setIsElecting] = useState(false);

  // Search state
  const [searchQuery, setSearchQuery] = useState('distributed consensus etcd');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<{
    latency: number;
    docsScanned: string;
    rerankAccuracy: string;
    throughput: string;
    matches: { title: string; score: number; docId: string }[];
  }>({
    latency: 120,
    docsScanned: '1,048,576',
    rerankAccuracy: '+25.4%',
    throughput: '10,240 events/sec',
    matches: [
      { title: 'Leader Election Protocol via Distributed Lease Lock', score: 0.984, docId: 'doc-8491' },
      { title: 'Fault-Tolerant High-Throughput Task Queues in Go', score: 0.942, docId: 'doc-1920' },
      { title: 'Inverted Index Vector Embedding Clustering on GCP', score: 0.896, docId: 'doc-3312' },
    ],
  });

  // Background task simulator
  useEffect(() => {
    const timer = setInterval(() => {
      setNodes(prev =>
        prev.map(node => ({
          ...node,
          tasksExecuted: node.status === 'HEALTHY' ? node.tasksExecuted + Math.floor(Math.random() * 4) + 1 : node.tasksExecuted,
          cpuLoad: node.status === 'HEALTHY' ? Math.min(95, Math.max(30, node.cpuLoad + (Math.random() * 10 - 5))) : 0,
        }))
      );
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const triggerLeaderFailure = () => {
    if (isElecting) return;
    setIsElecting(true);

    const currentLeader = nodes.find(n => n.role === 'LEADER');
    const leaderId = currentLeader ? currentLeader.id : 'worker-1';

    // Simulate leader crash
    setNodes(prev =>
      prev.map(node =>
        node.id === leaderId ? { ...node, status: 'FAILED', role: 'FOLLOWER', cpuLoad: 0 } : node
      )
    );

    setElectionLogs(prev => [
      `[FAIL] ${leaderId} stopped responding to etcd heartbeat lease!`,
      `[ETCD] Lease revoked. Initiating distributed Raft-based re-election...`,
      ...prev.slice(0, 4),
    ]);

    // Simulate new election resolution
    setTimeout(() => {
      const eligible = nodes.filter(n => n.id !== leaderId);
      const newLeader = eligible[Math.floor(Math.random() * eligible.length)];

      setNodes(prev =>
        prev.map(node => {
          if (node.id === newLeader.id) return { ...node, role: 'LEADER', status: 'HEALTHY' };
          return node;
        })
      );

      setElectionLogs(prev => [
        `[ELECTED] ${newLeader.id} acquired /sched/leader lease in 82ms!`,
        `[RECOVERY] Resuming 500+ concurrent task allocations with zero task loss.`,
        ...prev.slice(0, 4),
      ]);
      setIsElecting(false);
    }, 1200);
  };

  const recoverCluster = () => {
    setNodes(prev =>
      prev.map((node, idx) => ({
        ...node,
        status: 'HEALTHY',
        role: idx === 0 ? 'LEADER' : 'FOLLOWER',
        cpuLoad: 45 + Math.floor(Math.random() * 25),
      }))
    );
    setElectionLogs(prev => [
      '[RESTORE] All 4 worker nodes online. Leader lock assigned to worker-1.',
      ...prev.slice(0, 4),
    ]);
  };

  const runSearchBenchmark = (queryText: string) => {
    setIsSearching(true);
    setSearchQuery(queryText);
    setTimeout(() => {
      setIsSearching(false);
      setSearchResult({
        latency: Math.floor(115 + Math.random() * 18),
        docsScanned: '1,048,576',
        rerankAccuracy: '+25.4%',
        throughput: '10,480 events/sec',
        matches: [
          { title: `${queryText.toUpperCase()}: Inverted Index Match`, score: 0.978, docId: 'doc-' + Math.floor(1000 + Math.random() * 9000) },
          { title: 'Vector Dot-Product Ranking & Multi-Node Retrieval', score: 0.931, docId: 'doc-' + Math.floor(1000 + Math.random() * 9000) },
          { title: 'Real-time Kafka Event Streaming Partition Buffer', score: 0.884, docId: 'doc-' + Math.floor(1000 + Math.random() * 9000) },
        ],
      });
    }, 300);
  };

  return (
    <div className="w-full bg-[#131433]/90 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-xl shadow-2xl shadow-black/40">
      {/* Top Header & Tab Switcher */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between border-b border-white/10 bg-black/40 px-6 py-4 gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-[#4fb7b3]/20 border border-[#4fb7b3]/40 text-[#a8fbd3]">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#a8fbd3]">Interactive Architecture Lab</span>
            <h3 className="text-lg font-heading font-bold text-white">Systems Proof of Engineering</h3>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-2 p-1 bg-white/5 rounded-xl border border-white/10 self-start md:self-auto">
          <button
            onClick={() => setActiveTab('scheduler')}
            className={`px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'scheduler'
                ? 'bg-gradient-to-r from-[#4fb7b3] to-[#637ab9] text-white shadow-md font-bold'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
            data-hover="true"
          >
            Go Task Scheduler (etcd)
          </button>
          <button
            onClick={() => setActiveTab('search')}
            className={`px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'search'
                ? 'bg-gradient-to-r from-[#4fb7b3] to-[#637ab9] text-white shadow-md font-bold'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
            data-hover="true"
          >
            AI Semantic Search (FastAPI/Kafka)
          </button>
        </div>
      </div>

      {/* Simulator Content Area */}
      <div className="p-6 md:p-8">
        <AnimatePresence mode="wait">
          {activeTab === 'scheduler' ? (
            <motion.div
              key="scheduler"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              {/* Context Summary */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                <div>
                  <h4 className="text-white font-bold font-heading text-sm uppercase">Distributed Leader Election & Task Sync</h4>
                  <p className="text-xs text-gray-300 mt-1 max-w-2xl leading-relaxed">
                    Sustains 500+ concurrent tasks in Go with atomic mutex-based queues and automatic failover via etcd distributed consensus.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={triggerLeaderFailure}
                    disabled={isElecting}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/20 border border-red-500/40 text-red-200 text-xs font-mono uppercase hover:bg-red-500/30 transition-all cursor-pointer disabled:opacity-50"
                    data-hover="true"
                  >
                    <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                    Simulate Leader Crash
                  </button>
                  <button
                    onClick={recoverCluster}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-mono uppercase transition-all cursor-pointer"
                    data-hover="true"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Reset
                  </button>
                </div>
              </div>

              {/* Node Topology */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {nodes.map(node => (
                  <div
                    key={node.id}
                    className={`relative p-5 rounded-xl border transition-all duration-300 ${
                      node.status === 'FAILED'
                        ? 'bg-red-950/30 border-red-500/50'
                        : node.role === 'LEADER'
                        ? 'bg-[#4fb7b3]/15 border-[#a8fbd3]/60 shadow-[0_0_20px_rgba(79,183,179,0.2)]'
                        : 'bg-black/30 border-white/10'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Server className={`w-4 h-4 ${node.role === 'LEADER' ? 'text-[#a8fbd3]' : 'text-gray-400'}`} />
                        <span className="font-mono text-xs font-bold text-white uppercase">{node.id}</span>
                      </div>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                          node.role === 'LEADER'
                            ? 'bg-[#a8fbd3] text-black'
                            : node.status === 'FAILED'
                            ? 'bg-red-500 text-white'
                            : 'bg-white/10 text-gray-300'
                        }`}
                      >
                        {node.status === 'FAILED' ? 'CRASHED' : node.role}
                      </span>
                    </div>

                    <div className="space-y-2 text-xs font-mono">
                      <div className="flex justify-between text-gray-400">
                        <span>Tasks Complete:</span>
                        <span className="text-white font-bold tabular-nums">{node.tasksExecuted}</span>
                      </div>
                      <div className="flex justify-between text-gray-400">
                        <span>CPU Thread Load:</span>
                        <span className="text-white font-bold tabular-nums">{node.cpuLoad.toFixed(0)}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden mt-1">
                        <div
                          className={`h-full transition-all duration-500 ${
                            node.status === 'FAILED'
                              ? 'bg-red-500 w-0'
                              : node.role === 'LEADER'
                              ? 'bg-[#a8fbd3]'
                              : 'bg-[#637ab9]'
                          }`}
                          style={{ width: `${node.cpuLoad}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cluster Consensus Metrics & Logs */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 pt-2">
                <div className="bg-black/40 p-4 rounded-xl border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-[#a8fbd3]" />
                    <div>
                      <span className="text-[11px] font-mono text-gray-400 block">Completion Rate</span>
                      <span className="text-xl font-bold font-mono text-white tabular-nums">99.5%</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-[#a8fbd3] bg-[#a8fbd3]/10 px-2 py-1 rounded">SLA Intact</span>
                </div>

                <div className="bg-black/40 p-4 rounded-xl border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Zap className="w-5 h-5 text-[#4fb7b3]" />
                    <div>
                      <span className="text-[11px] font-mono text-gray-400 block">Throughput Boost</span>
                      <span className="text-xl font-bold font-mono text-white tabular-nums">+40%</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-gray-300">Mutex Sync</span>
                </div>

                <div className="bg-black/40 p-4 rounded-xl border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Activity className="w-5 h-5 text-[#637ab9]" />
                    <div>
                      <span className="text-[11px] font-mono text-gray-400 block">Failover Latency</span>
                      <span className="text-xl font-bold font-mono text-white tabular-nums">~80ms</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-gray-300">etcd Lease</span>
                </div>
              </div>

              {/* Live Terminal Log */}
              <div className="bg-[#090a18] p-4 rounded-xl border border-white/10 font-mono text-[11px] text-gray-300 space-y-1">
                <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#a8fbd3] animate-pulse" />
                  Live etcd Raft Protocol Telemetry
                </div>
                {electionLogs.map((log, i) => (
                  <div key={i} className="flex gap-2">
                    <span className="text-gray-500 select-none">&gt;</span>
                    <span className={log.includes('FAIL') ? 'text-red-400' : log.includes('ELECTED') ? 'text-[#a8fbd3] font-bold' : 'text-gray-300'}>
                      {log}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="search"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              {/* Context Summary */}
              <div className="bg-white/5 p-4 rounded-xl border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h4 className="text-white font-bold font-heading text-sm uppercase">Vector Embedding & Kafka Real-Time Pipeline</h4>
                  <p className="text-xs text-gray-300 mt-1 max-w-2xl leading-relaxed">
                    Processed 1M+ documents on GCP, slashing latency from 800ms to 120ms (85% reduction) with Kafka ingestion sustaining 10,000+ events/sec.
                  </p>
                </div>
              </div>

              {/* Interactive Query Box */}
              <div className="bg-black/40 p-4 rounded-xl border border-white/10 space-y-3">
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      placeholder="Try querying distributed systems, Kafka, or vector search..."
                      className="w-full bg-[#090a18] border border-white/10 rounded-lg px-4 py-2.5 text-xs font-mono text-white placeholder-gray-500 focus:outline-none focus:border-[#4fb7b3]"
                    />
                  </div>
                  <button
                    onClick={() => runSearchBenchmark(searchQuery)}
                    disabled={isSearching}
                    className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#4fb7b3] to-[#637ab9] hover:opacity-90 text-white text-xs font-mono uppercase tracking-wider font-bold transition-all cursor-pointer"
                    data-hover="true"
                  >
                    {isSearching ? 'Querying Index...' : 'Benchmark Query'}
                  </button>
                </div>

                {/* Query Quick Presets */}
                <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                  <span className="text-gray-400 font-mono text-[11px]">Quick Tests:</span>
                  {[
                    'fault-tolerant leader election',
                    'kafka high-throughput ingestion',
                    'vector embedding inverted index',
                    'concurrency mutex race conditions',
                  ].map((preset, i) => (
                    <button
                      key={i}
                      onClick={() => runSearchBenchmark(preset)}
                      className="text-[11px] font-mono text-[#a8fbd3] bg-white/5 hover:bg-white/10 px-2.5 py-1 rounded transition-colors cursor-pointer"
                      data-hover="true"
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>

              {/* Latency Comparison Visualizer */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Legacy Baseline */}
                <div className="bg-black/30 p-5 rounded-xl border border-white/10">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-mono text-gray-400 uppercase">Legacy Document Scan</span>
                    <span className="text-xs font-mono text-red-400">Baseline</span>
                  </div>
                  <div className="text-3xl font-bold font-mono text-gray-300 tabular-nums mb-3">800 ms</div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-red-400/80 w-full" />
                  </div>
                  <p className="text-[11px] text-gray-400 mt-3 font-mono">Sequential full-table scan on 1M documents without optimized indexing.</p>
                </div>

                {/* Om's Optimized Pipeline */}
                <div className="bg-[#4fb7b3]/10 p-5 rounded-xl border border-[#4fb7b3]/40 shadow-[0_0_25px_rgba(79,183,179,0.15)]">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-mono text-[#a8fbd3] uppercase font-bold">Om's Inverted Index + Vectors</span>
                    <span className="text-xs font-mono text-[#a8fbd3] bg-[#a8fbd3]/20 px-2 py-0.5 rounded font-bold">85% Faster</span>
                  </div>
                  <div className="text-3xl font-bold font-mono text-[#a8fbd3] tabular-nums mb-3">{searchResult.latency} ms</div>
                  <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#a8fbd3] to-[#4fb7b3] transition-all duration-300"
                      style={{ width: `${(searchResult.latency / 800) * 100}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-gray-300 mt-3 font-mono">FastAPI + Elasticsearch inverted index with ML reranker (+25% precision).</p>
                </div>
              </div>

              {/* Search Output Results */}
              <div className="bg-[#090a18] p-5 rounded-xl border border-white/10 space-y-3">
                <div className="flex justify-between items-center text-xs font-mono border-b border-white/10 pb-3">
                  <span className="text-gray-400">
                    Retrieved from <span className="text-white font-bold">{searchResult.docsScanned}</span> documents on GCP
                  </span>
                  <span className="text-[#a8fbd3] font-bold">Ingestion: {searchResult.throughput}</span>
                </div>

                <div className="space-y-2 pt-1">
                  {searchResult.matches.map((match, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5 text-xs">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-gray-500 font-bold">0{i + 1}</span>
                        <div>
                          <p className="text-white font-mono font-medium">{match.title}</p>
                          <span className="text-[10px] text-gray-400 font-mono">ID: {match.docId}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-mono text-xs text-[#a8fbd3] font-bold">{(match.score * 100).toFixed(1)}% match</span>
                        <span className="block text-[10px] text-gray-400 font-mono">Cosine Sim</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
