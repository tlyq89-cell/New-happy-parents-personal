import React, { useEffect } from 'react';

export const DisqusForum: React.FC = () => {
  useEffect(() => {
    // If DISQUS object exists, reset for SPA route changes
    if (window && (window as any).DISQUS) {
      (window as any).DISQUS.reset({
        reload: true,
        config: function (this: any) {
          this.page.url = window.location.href;
          this.page.identifier = 'happy-parents-landing-forum';
        },
      });
    } else {
      // Inject Disqus embed.js script dynamically
      const d = document;
      const s = d.createElement('script');
      s.src = 'https://agent-ai.disqus.com/embed.js';
      s.setAttribute('data-timestamp', (+new Date()).toString());
      (d.head || d.body).appendChild(s);
    }
  }, []);

  return (
    <section className="bg-white rounded-xl p-5 sm:p-6 border border-[#c3c5d9]/30 shadow-xs space-y-4 mt-8">
      <div className="border-b border-[#c3c5d9]/30 pb-3">
        <h3 className="text-lg font-extrabold text-[#191c1e] tracking-tight">Parent Discussion & Reviews Forum</h3>
        <p className="text-xs text-[#434656]">Join fellow parents to discuss classes, instructors, and enrichment experiences.</p>
      </div>

      <div id="disqus_thread"></div>

      <noscript>
        Please enable JavaScript to view the{' '}
        <a href="https://disqus.com/?ref_noscript" target="_blank" rel="noreferrer">
          comments powered by Disqus.
        </a>
      </noscript>
    </section>
  );
};
