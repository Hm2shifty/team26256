import fs from 'fs';

const siteUrl = 'https://swervo26256.vercel.app';

const staticRoutes = [
  '/',
  '/gallery',
  '/portfolio',
  '/robot',
  '/sponsors',
  '/stats',
  '/contact',
  '/registration',
  '/notebook'
];

function generateNotebookRoutes(data) {
  let routes = [];
  
  const processNode = (node) => {
    if (node.content && node.id) {
      routes.push(`/notebook/${node.id}`);
    }
    const children = node.subsections || node.sections || [];
    for (const child of children) {
      processNode(child);
    }
  };
  
  if (data.sections) {
    for (const section of data.sections) {
      processNode(section);
    }
  }
  
  return routes;
}

try {
  const notebookData = JSON.parse(fs.readFileSync('./public/notebook.json', 'utf-8'));
  const dynamicRoutes = generateNotebookRoutes(notebookData);
  const allRoutes = [...staticRoutes, ...dynamicRoutes];
  
  const today = new Date().toISOString().split('T')[0];
  
  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes.map(route => `  <url>
    <loc>${siteUrl}${route}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route === '/' || route.includes('/notebook') ? 'weekly' : 'monthly'}</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;

  fs.writeFileSync('./public/sitemap-latest.xml', sitemapContent);
  console.log('Successfully generated sitemap-latest.xml with', allRoutes.length, 'routes.');
} catch (error) {
  console.error('Error generating sitemap:', error);
}
