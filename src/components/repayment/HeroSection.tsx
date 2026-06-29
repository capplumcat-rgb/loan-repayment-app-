export function HeroSection({ companyName }: { companyName: string }) {
  return (
    <div className="bg-gradient-to-br from-[#1e40af] via-[#2563eb] to-[#3b82f6] px-5 pt-8 pb-12 text-white">
      <div className="mx-auto max-w-md">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 text-lg font-bold">
            {companyName.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-medium text-white/80">{companyName}</p>
            <h1 className="text-2xl font-bold">Payment Request</h1>
          </div>
        </div>

        <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-medium">
          <ShieldIcon />
          Direct UPI transfer — not a payment gateway
        </div>
      </div>
    </div>
  );
}

function ShieldIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}
