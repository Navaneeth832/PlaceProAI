import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, Loader2 } from 'lucide-react';
import InputField from '../components/InputField';
import { predictPlacement, StudentData, PredictionResult } from '../utils/api'; // Updated import

const Form = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    branch: '',
    gpa: '',
    attendance: '',
    backlogs: '',
    skills: '',
    internshipDone: '',
    clubs: '',
  });

  const branches = ['CSE', 'ECE', 'EEE', 'MECH', 'CIVIL', 'IT', 'Other'];
  const genders = ['Male', 'Female', 'Other'];
  const yesNoOptions = ['Yes', 'No'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.age || parseInt(formData.age) < 18 || parseInt(formData.age) > 30) {
      newErrors.age = 'Age must be between 18 and 30';
    }
    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
    }
    if (!formData.branch) {
      newErrors.branch = 'Branch is required';
    }
    if (!formData.gpa || parseFloat(formData.gpa) < 0 || parseFloat(formData.gpa) > 10) {
      newErrors.gpa = 'GPA must be between 0 and 10';
    }
    if (!formData.attendance || parseFloat(formData.attendance) < 0 || parseFloat(formData.attendance) > 100) {
      newErrors.attendance = 'Attendance must be between 0 and 100';
    }
    if (!formData.backlogs || parseInt(formData.backlogs) < 0) {
      newErrors.backlogs = 'Backlogs cannot be negative';
    }
    if (!formData.skills.trim()) {
      newErrors.skills = 'Skills are required';
    }
    if (!formData.internshipDone) {
      newErrors.internshipDone = 'Please specify internship status';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    const processedData: StudentData = {
      age: parseInt(formData.age, 10),
      gender: formData.gender,
      branch: formData.branch,
      gpa: parseFloat(formData.gpa),
      backlogs: parseInt(formData.backlogs, 10),
      attendance: parseFloat(formData.attendance),
      internshipDone: formData.internshipDone === 'Yes',
      Skills: formData.skills.split(',').map(skill => skill.trim()),
      Clubs: formData.clubs.split(',').map(club => club.trim()).filter(Boolean),
    };

    try {
      const predictionResult: PredictionResult = await predictPlacement(processedData);

      const roadmapSteps = predictionResult.roadmap
        ? predictionResult.roadmap.split('\n').filter(line => line.trim() !== '')
        : [];

      const resultData = {
        placementChance: predictionResult.placement_chance,
        roadmap: roadmapSteps,
        studentData: formData,
      };

      sessionStorage.setItem('predictionResult', JSON.stringify(resultData));
      navigate('/result');
    } catch (error) {
      console.error('Submission error:', error);
      // You may add a toast or alert here for UX
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Student Placement Prediction
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Fill in your academic details to get an AI-powered placement prediction and personalized roadmap.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <InputField
              label="Age"
              name="age"
              type="number"
              value={formData.age}
              onChange={handleChange}
              placeholder="Enter your age"
              error={errors.age}
              required
              min={18}
              max={30}
            />

            <InputField
              label="Gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              options={genders}
              error={errors.gender}
              required
            />

            <InputField
              label="Branch"
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              options={branches}
              error={errors.branch}
              required
            />

            <InputField
              label="GPA"
              name="gpa"
              type="number"
              value={formData.gpa}
              onChange={handleChange}
              placeholder="Enter your GPA (0-10)"
              error={errors.gpa}
              required
              min={0}
              max={10}
              step={0.1}
            />

            <InputField
              label="Attendance (%)"
              name="attendance"
              type="number"
              value={formData.attendance}
              onChange={handleChange}
              placeholder="Enter attendance percentage"
              error={errors.attendance}
              required
              min={0}
              max={100}
            />

            <InputField
              label="Number of Backlogs"
              name="backlogs"
              type="number"
              value={formData.backlogs}
              onChange={handleChange}
              placeholder="Enter number of backlogs"
              error={errors.backlogs}
              required
              min={0}
            />

            <InputField
              label="Internship Done"
              name="internshipDone"
              value={formData.internshipDone}
              onChange={handleChange}
              options={yesNoOptions}
              error={errors.internshipDone}
              required
            />

            <InputField
              label="Clubs (Optional)"
              name="clubs"
              value={formData.clubs}
              onChange={handleChange}
              placeholder="Enter clubs you're part of"
            />
          </div>

          <InputField
            label="Skills"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            placeholder="Enter your skills (comma-separated, e.g., JavaScript, Python, React)"
            error={errors.skills}
            required
          />

          <div className="pt-6">
            <button
              type="submit"
              disabled={loading}
              className="w-full px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  <span>Get Prediction</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;