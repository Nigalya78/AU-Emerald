import { Metadata } from 'next';
import TermsClient from '@/components/TermsClient';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Au Emerald',
  description: 'Terms and conditions for gold savings schemes, purchases, and services at Au Emerald.',
  alternates: {
    canonical: 'https://www.auemerald.com/terms',
  },
};

export default function TermsPage() {
  return <TermsClient />;
}
