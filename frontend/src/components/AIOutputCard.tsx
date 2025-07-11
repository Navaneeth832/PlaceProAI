import React from 'react';
import { Brain, Lightbulb, Target, CheckCircle, ArrowRight } from 'lucide-react';

interface AIOutputCardProps {
  prediction?: number;
  roadmap?: string;
  skills?: string[];
  recommendations?: string[];
}

const AIOutputCard: React.FC<AIOutputCardProps> = ({
  prediction,
  roadmap,
  skills = [],
  recommendations = [],
}) => {
  const getPredictionColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600 dark:text-green-400';
    if (percentage >= 60) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getPredictionBg = (percentage: number) => {
    if (percentage >= 80) return 'bg-green-100 dark:bg-green-900/20';
    if (percentage >= 60) return 'bg-yellow-100 dark:bg-yellow-900/20';
    return 'bg-red-100 dark:bg-red-900/20';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-6 text-white">
        <div className="flex items-center space-x-3">
          <Brain className="h-8 w-8" />
          <div>
            <h2 className="text-2xl font-bold">AI Placement Analysis</h2>
            <p className="text-primary-100">Personalized insights and recommendations</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Prediction Score */}
        <div className={`${getPredictionBg(prediction || 0)} rounded-lg p-6 text-center`}>
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Target className={`h-6 w-6 ${getPredictionColor(prediction || 0)}`} />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Placement Probability
            </h3>
          </div>
          <div className={`text-4xl font-bold ${getPredictionColor(prediction || 0)} mb-2`}>
            {typeof prediction === 'number' ? `${prediction.toFixed(1)}%` : 'N/A'}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Based on your academic profile and skills
          </p>
        </div>

        {/* Roadmap */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <ArrowRight className="h-5 w-5 text-primary-600 dark:text-primary-400" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Career Roadmap
            </h3>
          </div>
          {roadmap.length > 0 ? (
            <div className="space-y-3">
              {roadmap.map((step, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
                      {index + 1}
                    </span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">{step}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400">No roadmap available</p>
          )}
        </div>

        {/* Skills to Develop */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <Lightbulb className="h-5 w-5 text-primary-600 dark:text-primary-400" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Skills to Develop
            </h3>
          </div>
          {skills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400">No skills listed</p>
          )}
        </div>

        {/* Recommendations */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <CheckCircle className="h-5 w-5 text-primary-600 dark:text-primary-400" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Recommendations
            </h3>
          </div>
          {recommendations.length > 0 ? (
            <div className="space-y-2">
              {recommendations.map((rec, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700 dark:text-gray-300 text-sm">{rec}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400">No recommendations yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIOutputCard;
