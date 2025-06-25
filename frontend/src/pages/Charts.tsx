import React, { useState, useEffect } from 'react';
import { BarChart3, PieChart, TrendingUp, Filter } from 'lucide-react';
import ChartViewer from '../components/ChartViewer';
//import { getAnalyticsData, generateMockAnalytics } from '../utils/api';

const Charts = () => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedMetric, setSelectedMetric] = useState('all');

  useEffect(() => {
    loadAnalyticsData();
  }, []);

  const loadAnalyticsData = async () => {
    setLoading(true);
    try {
      // For demo purposes, using mock data
      // In production, use: const data = await getAnalyticsData();
      await new Promise(resolve => setTimeout(resolve, 1000));
      const data = generateMockAnalytics();
      setAnalyticsData(data);
    } catch (error) {
      console.error('Error loading analytics data:', error);
    } finally {
      setLoading(false);
    }
  };

  const metrics = [
    { value: 'all', label: 'All Metrics' },
    { value: 'branch', label: 'Branch Analysis' },
    { value: 'gender', label: 'Gender Distribution' },
    { value: 'gpa', label: 'GPA Trends' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64 space-x-3">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        <span className="text-gray-600 dark:text-gray-400">Loading analytics...</span>
      </div>
    );
  }

  if (!analyticsData) {
    return (
      <div className="text-center py-16">
        <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          No Analytics Data Available
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Start making predictions to see analytics and insights.
        </p>
        <button
          onClick={loadAnalyticsData}
          className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
        >
          Refresh Data
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Placement Analytics
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Comprehensive insights and trends from placement prediction data
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Filter className="h-5 w-5 text-gray-400" />
          <select
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            {metrics.map((metric) => (
              <option key={metric.value} value={metric.value}>
                {metric.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <BarChart3 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">2,547</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Predictions</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">76.8%</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Avg. Probability</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
              <PieChart className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">1,892</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">High Probability</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
              <TrendingUp className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">94.2%</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Accuracy Rate</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {(selectedMetric === 'all' || selectedMetric === 'branch') && (
          <ChartViewer
            type="bar"
            data={analyticsData.branchData}
            title="Placement Rate by Branch"
            className="animate-slide-up"
          />
        )}

        {(selectedMetric === 'all' || selectedMetric === 'gender') && (
          <ChartViewer
            type="pie"
            data={analyticsData.genderData}
            title="Gender Distribution"
            className="animate-slide-up"
          />
        )}

        {(selectedMetric === 'all' || selectedMetric === 'gpa') && (
          <div className={selectedMetric === 'gpa' ? 'lg:col-span-2' : ''}>
            <ChartViewer
              type="line"
              data={analyticsData.gpaData}
              title="GPA vs Placement Probability Trend"
              className="animate-slide-up"
            />
          </div>
        )}
      </div>

      {/* Insights Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Key Insights
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Top Performing Branches
            </h3>
            <div className="space-y-3">
              {analyticsData.branchData
                .sort((a, b) => b.value - a.value)
                .slice(0, 3)
                .map((branch, index) => (
                  <div key={branch.name} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold ${
                        index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-500'
                      }`}>
                        {index + 1}
                      </div>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {branch.name}
                      </span>
                    </div>
                    <span className="text-primary-600 dark:text-primary-400 font-semibold">
                      {branch.value}%
                    </span>
                  </div>
                ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Recommendations
            </h3>
            <div className="space-y-3 text-gray-600 dark:text-gray-400">
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                <p>CSE students show the highest placement probability at 85%</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                <p>Students with GPA above 8.0 have 90%+ placement success rate</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                <p>Focus on improving technical skills for better placement outcomes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charts;