import { HiX, HiMail, HiUser, HiCalendar, HiTag } from 'react-icons/hi';

export default function MessageModal({ submission, onClose }) {
  if (!submission) return null;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-[#0f0d1a]">Submission Details</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors"
          >
            <HiX className="text-xl text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="bg-[#f7f6fb] rounded-xl p-4">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
              Submission ID
            </p>
            <p className="text-lg font-bold text-[#6c47ff]">#{submission.id}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <HiUser className="text-gray-400" />
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Name
                </p>
              </div>
              <p className="text-sm text-gray-900 font-medium">
                {submission.firstName} {submission.lastName}
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <HiMail className="text-gray-400" />
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Email
                </p>
              </div>
              <p className="text-sm text-gray-900">{submission.email}</p>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <HiTag className="text-gray-400" />
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Enquiry Type
                </p>
              </div>
              <span className="inline-flex px-3 py-1 text-xs font-medium rounded-full bg-[#ede9ff] text-[#6c47ff]">
                {submission.enquiryType}
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <HiCalendar className="text-gray-400" />
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Submitted On
                </p>
              </div>
              <p className="text-sm text-gray-900">{formatDate(submission.createdAt)}</p>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Message
            </p>
            <div className="bg-[#f7f6fb] rounded-xl p-4">
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                {submission.message}
              </p>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4">
          <button
            onClick={onClose}
            className="w-full px-4 py-2.5 bg-[#6c47ff] text-white rounded-lg text-sm font-medium hover:bg-[#5a38e0] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
