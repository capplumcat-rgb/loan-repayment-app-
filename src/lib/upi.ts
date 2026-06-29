export interface PaymentParams {
  name: string;
  amount: number;
  upi: string;
  company?: string;
}

/**
 * Reads payment details from the URL's query string.
 * Expected link format:
 *   /?name=Fahad%20Ahmed&amount=1500&upi=merchant@oksbi
 * Optional: &company=LoanPay%20Finance
 */
export function getPaymentParamsFromUrl(): PaymentParams | null {
  const params = new URLSearchParams(window.location.search);
  const name = params.get('name');
  const amountStr = params.get('amount');
  const upi = params.get('upi');
  const company = params.get('company') ?? undefined;

  if (!name || !amountStr || !upi) return null;

  const amount = Number(amountStr);
  if (Number.isNaN(amount) || amount <= 0) return null;

  return { name, amount, upi, company };
}

/** Builds a standard UPI deep link that opens any UPI app with fields pre-filled. */
export function buildUpiUrl({ upi, name, amount }: PaymentParams): string {
  const params = new URLSearchParams({
    pa: upi,
    pn: name,
    am: amount.toFixed(2),
    cu: 'INR',
  });
  return `upi://pay?${params.toString()}`;
}

export function formatInr(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}
