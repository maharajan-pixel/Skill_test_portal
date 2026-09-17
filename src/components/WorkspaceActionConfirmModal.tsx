import React from 'react';
import { AlertCircle, CheckCircle, X, Mail, FileSpreadsheet, HardDrive, Send } from 'lucide-react';

export interface WorkspaceConfirmAction {
  type: 'GMAIL_SEND' | 'SHEETS_CREATE' | 'DRIVE_BACKUP';
  title: string;
  description: string;
  itemCount?: number;
  details: { label: string; value: string }[];
  confirmButtonText?: string;
  confirmButtonColor?: string;
}

interface WorkspaceActionConfirmModalProps {
  isOpen: boolean;
  action: WorkspaceConfirmAction | null;
  onConfirm: () => void;
  onCancel: () => void;
  isProcessing?: boolean;
}

export const WorkspaceActionConfirmModal: React.FC<WorkspaceActionConfirmModalProps> = ({
  isOpen,
  action,
  onConfirm,
  onCancel,
  isProcessing = false
}) => {
  if (!isOpen || !action) return null;

  const getIcon = () => {
    switch (action.type) {
      case 'GMAIL_SEND':
        return <Mail className="w-6 h-6 text-red-600" />;
      case 'SHEETS_CREATE':
        return <FileSpreadsheet className="w-6 h-6 text-emerald-600" />;
      case 'DRIVE_BACKUP':
        return <HardDrive className="w-6 h-6 text-indigo-600" />;
    }
  };

  const getBadgeColor = () => {
    switch (action.type) {
      case 'GMAIL_SEND':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'SHEETS_CREATE':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'DRIVE_BACKUP':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border-2 border-slate-300 rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-200 flex items-start justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white rounded-2xl border border-slate-200 shadow-xs">
              {getIcon()}
            </div>
            <div>
              <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md border ${getBadgeColor()} inline-block mb-1`}>
                Google Workspace Confirmation
              </span>
              <h3 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
                {action.title}
              </h3>
            </div>
          </div>
          <button
            onClick={onCancel}
            disabled={isProcessing}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-xl hover:bg-slate-200 transition cursor-pointer disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-4">
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
            {action.description}
          </p>

          {/* Details Table */}
          {action.details.length > 0 && (
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 space-y-2 text-xs">
              {action.details.map((d, i) => (
                <div key={i} className="flex justify-between items-start gap-2 border-b border-slate-200/60 pb-1.5 last:border-b-0 last:pb-0">
                  <span className="font-bold text-slate-500">{d.label}:</span>
                  <span className="font-mono text-slate-900 text-right break-all font-semibold max-w-[260px]">
                    {d.value}
                  </span>
                </div>
              ))}
            </div>
          )}

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-start gap-2 text-xs text-amber-800">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>
              This operation executes directly against your authorized Google Workspace account using your approved OAuth permissions.
            </span>
          </div>
        </div>

        {/* Action Footer */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={isProcessing}
            className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 transition cursor-pointer disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isProcessing}
            className={`px-5 py-2.5 rounded-xl text-xs font-black text-white shadow-sm transition flex items-center gap-2 cursor-pointer disabled:opacity-60 ${
              action.confirmButtonColor || 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            {isProcessing ? (
              <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <CheckCircle className="w-4 h-4" />
            )}
            <span>{action.confirmButtonText || 'Confirm & Proceed'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
