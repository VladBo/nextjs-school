import { permanentRedirect } from 'next/navigation';

export default function DrupalHomeAlias() {
  permanentRedirect('/');
}
