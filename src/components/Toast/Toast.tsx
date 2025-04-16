import SVGIcon from '../SVGIcon';
import { toast } from 'sonner';

export const showSuccessToast = (title: string, description: string) => {
  toast.custom(
    t => (
      <div
        className="relative rounded-[6px] border border-[#3EC484] bg-[#E1F3EC] p-4 shadow-md"
        onClick={() => toast.dismiss(t)}>
        <SVGIcon icon="cross" className="absolute right-2 top-2 cursor-pointer" />
        <div className="flex min-w-[250px] items-start gap-3">
          <SVGIcon icon="check-success" />
          <div className="flex flex-col gap-1">
            <span className="text-base font-semibold text-[#08B461]">{title}</span>
            <span className="text-wrap break-words text-sm text-[#1A274F]">{description}</span>
          </div>
        </div>
      </div>
    ),
    {
      duration: Infinity,
    }
  );
};

export const showErrorToast = (title: string, description: string) => {
  toast.custom(
    t => (
      <div className="rounded-md border border-[#C43E5E] bg-[#F3E1EA] p-4 shadow-md" onClick={() => toast.dismiss(t)}>
        <SVGIcon icon="cross" className="absolute right-2 top-2 cursor-pointer" />
        <div className="flex min-w-[250px] items-start gap-3">
          <SVGIcon icon="check-error" />
          <div className="flex flex-col gap-1">
            <div className="font-semibold text-[#EA3B3B]">{title}</div>
            <div className="text-wrap break-words text-sm text-[#1A274F]">{description}</div>
          </div>
        </div>
      </div>
    ),
    {
      duration: 4000,
    }
  );
};
