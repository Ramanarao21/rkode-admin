import { useState, useEffect } from 'react';
import { HiDocumentText, HiUsers, HiMail, HiDownload } from 'react-icons/hi';
import Header from './components/Header';
import StatsCard from './components/StatsCard';
import SubmissionTable from './components/SubmissionTable';
import MessageModal from './components/MessageModal';
import AuthModal from './components/AuthModal';
import formService from './services/formService';
import authService from './services/authService';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  useEffect(() => {
    const authenticated = authService.isAuthenticated();
    setIsAuthenticated(authenticated);
    if (!authenticated) {
      setShowAuthModal(true);
      setLoading(false);
    } else {
      fetchSubmissions();
    }
  }, []);

  const fetchSubmissions = async () => {
    setLoading(true);
    setError('');
    
    const result = await formService.getAllForms();
    
    if (result.success) {
      setSubmissions(result.data);
    } else {
      setError(result.message);
    }
    
    setLoading(false);
  };

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    setShowAuthModal(false);
    fetchSubmissions();
  };

  const handleDownloadCSV = () => {
    if (submissions.length === 0) {
      alert('No data to download');
      return;
    }

    // Convert submissions to CSV
    const headers = ['ID', 'First Name', 'Last Name', 'Email', 'Enquiry Type', 'Message', 'Date'];
    const csvRows = [headers.join(',')];

    submissions.forEach((submission) => {
      const row = [
        submission.id,
        `"${submission.firstName || ''}"`,
        `"${submission.lastName || ''}"`,
        submission.email,
        `"${submission.enquiryType || ''}"`,
        `"${(submission.message || '').replace(/"/g, '""')}"`, // Escape quotes
        new Date(submission.createdAt).toLocaleString(),
      ];
      csvRows.push(row.join(','));
    });

    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `submissions_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#f7f6fb] flex items-center justify-center">
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => {}}
          onSuccess={handleAuthSuccess}
        />
      </div>
    );
  }

  const stats = [
    {
      title: 'Total Submissions',
      value: submissions.length,
      icon: HiDocumentText,
      color: 'purple',
    },
    {
      title: 'Unique Users',
      value: new Set(submissions.map(s => s.email)).size,
      icon: HiUsers,
      color: 'blue',
    },
    {
      title: 'This Month',
      value: submissions.filter(s => {
        const date = new Date(s.createdAt);
        const now = new Date();
        return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
      }).length,
      icon: HiMail,
      color: 'green',
    },
  ];

  return (
    <div className="min-h-screen bg-[#f7f6fb]">
      <Header />
      
      <main className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#0f0d1a] mb-2">Dashboard Overview</h2>
          <p className="text-gray-500">Manage and view all contact form submissions</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>

        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-[#0f0d1a]">Recent Submissions</h3>
          <div className="flex items-center gap-3">
            <button
              onClick={handleDownloadCSV}
              className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              <HiDownload className="text-lg" />
              Download CSV
            </button>
            <button
              onClick={fetchSubmissions}
              className="px-4 py-2 bg-[#6c47ff] text-white rounded-lg text-sm font-medium hover:bg-[#5a38e0] transition-colors"
            >
              Refresh
            </button>
          </div>
        </div>

        {loading ? (
          <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
            <p className="text-gray-500">Loading submissions...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <p className="text-red-800">{error}</p>
            <button
              onClick={fetchSubmissions}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : (
          <SubmissionTable 
            submissions={submissions} 
            onViewMessage={setSelectedSubmission}
          />
        )}
      </main>

      {selectedSubmission && (
        <MessageModal
          submission={selectedSubmission}
          onClose={() => setSelectedSubmission(null)}
        />
      )}
    </div>
  );
}
