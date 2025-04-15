import { CheckCircle, XCircle } from 'lucide-react';

import { toast } from 'sonner';

export const showSuccessToast = (title: string, description: string) => {
  toast.custom(
    t => (
      <div className="rounded-md border border-[#3EC484] bg-[#E1F3EC] p-4 shadow-md" onClick={() => toast.dismiss(t)}>
        <div className="flex items-start gap-3">
          <CheckCircle className="mt-0.5 text-[#08B461]" />
          <div>
            <div className="font-semibold text-[#08B461]">{title}</div>
            <div className="text-sm text-[#257F5C]">{description}</div>
          </div>
        </div>
      </div>
    ),
    {
      duration: 4000,
    }
  );
};

export const showErrorToast = (title: string, description: string) => {
  toast.custom(
    t => (
      <div className="rounded-md border border-[#C43E5E] bg-[#F3E1EA] p-4 shadow-md" onClick={() => toast.dismiss(t)}>
        <div className="flex items-start gap-3">
          <XCircle className="mt-0.5 text-red-600" />
          <div>
            <div className="font-semibold text-[#EA3B3B]">{title}</div>
            <div className="text-sm text-[#A12A44]">{description}</div>
          </div>
        </div>
      </div>
    ),
    {
      duration: 4000,
    }
  );
};
