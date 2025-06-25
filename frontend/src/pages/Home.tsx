import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Users, BarChart3, Upload, Target, Sparkles } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Predictions',
      description: 'Get accurate placement predictions using advanced machine learning algorithms.',
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: Target,
      title: 'Personalized Roadmaps',
      description: 'Receive customized career guidance and skill development recommendations.',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Upload,
      title: 'Batch Processing',
      description: 'Upload CSV files to analyze multiple students simultaneously.',
      color: 'from-green-500 to-green-600',
    },
    {
      icon: BarChart3,
      title: 'Detailed Analytics',
      description: 'Visualize placement trends and statistics with interactive charts.',
      color: 'from-orange-500 to-orange-600',
    },
  ];

  const stats = [
    { label: 'Students Analyzed', value: '2,500+' },
    { label: 'Accuracy Rate', value: '94.2%' },
    { label: 'Career Roadmaps', value: '1,800+' },
    { label: 'Success Stories', value: '420+' },
  ];

  return (
    <div className="space-y-16 animate-fade-in">
      {/* Hero Section */}
      <div className="text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
            Smart <span className="bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
              Placement
            </span> Predictions
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Leverage the power of AI to predict placement success and get personalized career guidance.
            Make informed decisions about your future with our intelligent analytics platform.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/form"
            className="px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Get Your Prediction
          </Link>
          <Link
            to="/charts"
            className="px-8 py-4 border-2 border-primary-600 text-primary-600 dark:text-primary-400 font-semibold rounded-lg hover:bg-primary-600 hover:text-white dark:hover:bg-primary-600 dark:hover:text-white transition-all duration-300"
          >
            View Analytics
          </Link>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
          >
            <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
              {stat.value}
            </div>
            <div className="text-gray-600 dark:text-gray-400 font-medium">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Features Section */}
      <div className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Powerful Features for Your Success
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Our comprehensive platform provides everything you need to understand and improve your placement prospects.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 p-12 rounded-2xl text-center text-white shadow-2xl">
        <div className="space-y-6">
          <div className="flex items-center justify-center space-x-2">
            <Sparkles className="h-8 w-8" />
            <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
          </div>
          <p className="text-xl text-primary-100 max-w-2xl mx-auto">
            Join thousands of students who have already discovered their placement potential.
            Get your personalized AI prediction in minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/form"
              className="px-8 py-4 bg-white text-primary-600 font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Start Your Prediction
            </Link>
            <Link
              to="/batch"
              className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary-600 transition-all duration-300"
            >
              Upload Batch Data
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;