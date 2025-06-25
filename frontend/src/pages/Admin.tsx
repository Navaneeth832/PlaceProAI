import React, { useState, useEffect } from 'react';
import { Users, TrendingUp, Database, Trash2, RefreshCw, Award, BookOpen, Brain } from 'lucide-react';
//import {generateMockAdminStats } from '../utils/api';

const Admin = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [clearing, setClearing] = useState(false);

  useEffect(() => {
    loadAdminStats();
  }, []);

  const loadAdminStats = async () => {
    setLoading(true);
    try {
      // For demo purposes, using mock data
      // In production, use: const data = await getAdminStats();
      await new Promise(resolve => setTimeout(resolve, 1000));
      const data = generateMockAdminStats();
      setStats(data);
    } catch (error) {
      console.error('Error loading admin stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClearDatabase = async () => {
    if (!window.confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
      return;
    }

    setClearing(true);
    try {
      // For demo purposes, simulating clear operation
      // In production, use: await clearDatabase();
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Reset stats after clearing
      setStats({
        totalStudents: 0,
        averagePlacement: 0,
        totalPredictions: 0,
        activeUsers: 0,
        topSkills: []
      });
      
      alert('Database cleared successfully!');
    } catch (error) {
      console.error('Error clearing database:', error);
      alert('Error clearing database. Please try again.');
    } finally {
      setClearing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64 space-x-3">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        <span className="text-gray-600 dark:text-gray-400">Loading admin dashboard...</span>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage system data and monitor platform performance
          </p>
        </div>
        
        <div className="flex space-x-3">
          <button
            onClick={loadAdminStats}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Refresh</span>
          </button>
          
          <button
            onClick={handleClearDatabase}
            disabled={clearing}
            className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 disabled:opacity-50"
          >
            {clearing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Clearing...</span>
              </>
            ) : (
              <>
                <Trash2 className="h-4 w-4" />
                <span>Clear Database</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats?.totalStudents?.toLocaleString() || '0'}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Students</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats?.averagePlacement?.toFixed(1) || '0.0'}%
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Avg. Placement Rate</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
              <Brain className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats?.totalPredictions?.toLocaleString() || '0'}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Predictions</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
              <Award className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats?.activeUsers || '0'}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Active Users</p>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Analytics */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Top Skills */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <BookOpen className="h-6 w-6 text-primary-600 dark:text-primary-400" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Most In-Demand Skills
            </h2>
          </div>
          
          <div className="space-y-4">
            {stats?.topSkills?.map((skill, index) => (
              <div key={skill} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary-700 dark:text-primary-300">
                      {index + 1}
                    </span>
                  </div>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {skill}
                  </span>
                </div>
                <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-primary-600 h-2 rounded-full" 
                    style={{ width: `${Math.max(20, 100 - index * 12)}%` }}
                  ></div>
                </div>
              </div>
            )) || (
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                No skill data available
              </p>
            )}
          </div>
        </div>

        {/* System Health */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Database className="h-6 w-6 text-primary-600 dark:text-primary-400" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              System Health
            </h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-900 dark:text-white font-medium">
                  Database Status
                </span>
              </div>
              <span className="text-green-600 dark:text-green-400 text-sm font-semibold">
                Healthy
              </span>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-900 dark:text-white font-medium">
                  AI Model Status
                </span>
              </div>
              <span className="text-green-600 dark:text-green-400 text-sm font-semibold">
                Active
              </span>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-gray-900 dark:text-white font-medium">
                  API Response Time
                </span>
              </div>
              <span className="text-blue-600 dark:text-blue-400 text-sm font-semibold">
                120ms
              </span>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-gray-900 dark:text-white font-medium">
                  Storage Usage
                </span>
              </div>
              <span className="text-yellow-600 dark:text-yellow-400 text-sm font-semibold">
                68%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          Recent Activity
        </h2>
        
        <div className="space-y-4">
          {[
            { action: 'New prediction generated', user: 'John Doe', time: '2 minutes ago', type: 'prediction' },
            { action: 'Batch upload processed', user: 'Admin', time: '15 minutes ago', type: 'batch' },
            { action: 'User registered', user: 'Jane Smith', time: '1 hour ago', type: 'user' },
            { action: 'AI model updated', user: 'System', time: '3 hours ago', type: 'system' },
            { action: 'Analytics report generated', user: 'Admin', time: '6 hours ago', type: 'report' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center space-x-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-900/50 rounded-lg transition-colors duration-200">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                activity.type === 'prediction' ? 'bg-blue-100 dark:bg-blue-900/20' :
                activity.type === 'batch' ? 'bg-green-100 dark:bg-green-900/20' :
                activity.type === 'user' ? 'bg-purple-100 dark:bg-purple-900/20' :
                activity.type === 'system' ? 'bg-orange-100 dark:bg-orange-900/20' :
                'bg-gray-100 dark:bg-gray-900/20'
              }`}>
                {activity.type === 'prediction' ? <Brain className="h-5 w-5 text-blue-600 dark:text-blue-400" /> :
                 activity.type === 'batch' ? <Database className="h-5 w-5 text-green-600 dark:text-green-400" /> :
                 activity.type === 'user' ? <Users className="h-5 w-5 text-purple-600 dark:text-purple-400" /> :
                 activity.type === 'system' ? <RefreshCw className="h-5 w-5 text-orange-600 dark:text-orange-400" /> :
                 <BookOpen className="h-5 w-5 text-gray-600 dark:text-gray-400" />}
              </div>
              <div className="flex-1">
                <p className="text-gray-900 dark:text-white font-medium">
                  {activity.action}
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  by {activity.user} · {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;