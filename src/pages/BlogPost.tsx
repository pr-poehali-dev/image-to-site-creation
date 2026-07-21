import { useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { blogPosts } from '@/data/blog';
import LeadFormModal from '@/components/LeadFormModal';

const BlogPost = () => {
  const { slug } = useParams();
  const [formOpen, setFormOpen] = useState(false);
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) return <Navigate to="/" replace />;

  const otherPosts = blogPosts.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <div className="min-h-screen bg-background text-brand-dark font-sans overflow-x-hidden">
      {/* HEADER */}
      <header className="sticky top-0 z-50 glass border-b border-black/5">
        <div className="container mx-auto flex items-center justify-between py-4">
          <Link to="/" className="flex flex-col leading-none">
            <span className="font-display font-extrabold text-xl tracking-tight">
              PRO<span className="text-brand">ximum</span>
            </span>
            <span className="text-[10px] text-muted-foreground tracking-wide">Цифровизация вашего бизнеса</span>
          </Link>
          <nav className="hidden lg:flex items-center gap-7">
            <Link to="/" className="text-sm font-medium hover:text-brand transition-colors">Главная</Link>
            <Link to="/portfolio" className="text-sm font-medium hover:text-brand transition-colors">Проекты</Link>
            <Link to="/clients" className="text-sm font-medium hover:text-brand transition-colors">Клиенты</Link>
            <a href="/#blog" className="text-sm font-medium text-brand transition-colors">Блог</a>
          </nav>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2">
              <Icon name="Phone" size={16} className="text-brand" />
              <span className="font-display font-bold text-sm">+7 (926) 895-96-06</span>
            </div>
            <Button onClick={() => setFormOpen(true)} className="rounded-full bg-brand text-brand-dark font-semibold hover:opacity-90 hidden sm:flex">
              Обсудить проект
            </Button>
          </div>
        </div>
      </header>

      {/* ARTICLE HERO */}
      <section className="relative grid-pattern">
        <div className="absolute top-0 right-0 w-[60%] h-full bg-gradient-to-bl from-brand/15 via-brand/5 to-transparent blur-3xl" />
        <div className="container mx-auto relative py-16 lg:py-20 max-w-3xl">
          <Link to="/#blog" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-brand transition-colors mb-6">
            <Icon name="ArrowLeft" size={16} /> К статьям блога
          </Link>
          <h1 className="font-display font-extrabold text-3xl md:text-5xl mt-3 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 mt-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5"><Icon name="Calendar" size={15} /> {post.date}</span>
            <span className="flex items-center gap-1.5"><Icon name="Clock" size={15} /> {post.readTime} чтения</span>
          </div>
        </div>
      </section>

      {/* ARTICLE CONTENT */}
      <section className="container mx-auto pb-20 max-w-3xl">
        <div className="w-full h-56 md:h-80 rounded-3xl overflow-hidden mb-10">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        </div>
        <article className="space-y-5">
          {post.content.map((block, i) => {
            if (block.type === 'h2') {
              return (
                <h2 key={i} className="font-display font-bold text-2xl mt-10 mb-2">{block.text}</h2>
              );
            }
            if (block.type === 'list') {
              return (
                <ul key={i} className="space-y-2 pl-1">
                  {block.items?.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-muted-foreground text-lg">
                      <Icon name="CheckCircle2" size={18} className="text-brand shrink-0 mt-1" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              );
            }
            return (
              <p key={i} className="text-muted-foreground text-lg leading-relaxed">{block.text}</p>
            );
          })}
        </article>

        <div className="mt-14 bg-brand-dark rounded-3xl p-8 md:p-10 text-white relative overflow-hidden text-center">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand/20 blur-3xl rounded-full" />
          <h3 className="font-display font-extrabold text-2xl md:text-3xl relative">Остались вопросы по теме?</h3>
          <p className="text-white/60 mt-3 relative">Обсудим вашу задачу и предложим оптимальное решение на 1С.</p>
          <Button size="lg" onClick={() => setFormOpen(true)} className="mt-6 rounded-full bg-brand text-brand-dark font-semibold text-base px-8 hover:opacity-90 relative">
            Обсудить проект <Icon name="ArrowRight" size={18} className="ml-1" />
          </Button>
        </div>
      </section>

      {/* OTHER POSTS */}
      {otherPosts.length > 0 && (
        <section className="bg-muted/40">
          <div className="container mx-auto py-16 max-w-3xl">
            <h3 className="font-display font-bold text-xl mb-6">Читайте также</h3>
            <div className="space-y-4">
              {otherPosts.map((p) => (
                <Link key={p.slug} to={`/blog/${p.slug}`} className="flex items-center gap-5 bg-white border border-black/5 rounded-2xl p-5 hover-lift">
                  <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-brand">{p.tag}</span>
                    <h4 className="font-display font-bold leading-tight">{p.title}</h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FOOTER */}
      <footer className="bg-brand-graphite text-white/70">
        <div className="container mx-auto py-8 flex flex-col sm:flex-row justify-between gap-2 text-xs">
          <span>© 2026 PROximum. Все права защищены.</span>
          <Link to="/" className="hover:text-brand">На главную</Link>
        </div>
      </footer>

      <LeadFormModal open={formOpen} onOpenChange={setFormOpen} />
    </div>
  );
};

export default BlogPost;