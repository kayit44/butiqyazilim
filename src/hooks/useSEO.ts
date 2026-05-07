import { useEffect } from 'react';

const SITE_NAME = 'Butiq Yazılım';
const SITE_URL = 'https://butiqyazilim.com.tr';
const DEFAULT_IMAGE = `${SITE_URL}/kurumsal1.jpg`;

const DEFAULT_DESCRIPTION =
  'İstanbul merkezli profesyonel web tasarımı, e-ticaret ve özel yazılım geliştirme hizmetleri. React, Next.js ve modern teknolojilerle projenizi hayata geçiriyoruz.';

interface SEOOptions {
  title: string;
  description?: string;
  path?: string;
  image?: string;
}

function updateMeta(selector: string, content: string) {
  const el = document.querySelector<HTMLMetaElement>(selector);
  if (el) el.setAttribute('content', content);
}

function updateLink(rel: string, href: string) {
  const el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (el) el.setAttribute('href', href);
}

export function useSEO({
  title,
  description = DEFAULT_DESCRIPTION,
  path = '',
  image = DEFAULT_IMAGE,
}: SEOOptions) {
  useEffect(() => {
    const fullTitle = `${title} | ${SITE_NAME}`;
    const fullUrl = `${SITE_URL}${path}`;

    document.title = fullTitle;

    updateMeta('meta[name="description"]', description);
    updateMeta('meta[name="title"]', fullTitle);

    updateMeta('meta[property="og:title"]', fullTitle);
    updateMeta('meta[property="og:description"]', description);
    updateMeta('meta[property="og:url"]', fullUrl);
    updateMeta('meta[property="og:image"]', image);

    updateMeta('meta[name="twitter:title"]', fullTitle);
    updateMeta('meta[name="twitter:description"]', description);
    updateMeta('meta[name="twitter:image"]', image);
    updateMeta('meta[name="twitter:url"]', fullUrl);

    updateLink('canonical', fullUrl);
  }, [title, description, path, image]);
}
