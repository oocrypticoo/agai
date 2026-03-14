import { Web3Provider } from '../jobs/providers/Web3Provider';

export default function DevelopersLayout({ children }: { children: React.ReactNode }) {
  return <Web3Provider>{children}</Web3Provider>;
}
