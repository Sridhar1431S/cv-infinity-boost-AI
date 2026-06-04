import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  ArrowRight, Sparkles, Search, Filter, CheckCircle2, Star, TrendingUp,
  Users, FileText, Zap, Award, Target, Briefcase, GraduationCap, Lock
} from 'lucide-react';
import Footer from '@/components/layout/Footer';

/* ---------- Landing-only marketing nav (white) ---------- */
function MarketingNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground text-sm font-bold">CV</span>
          </div>
          <span className="text-base font-semibold tracking-tight">CVInfinityBoost</span>
        </Link>
        <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
          <a href="#recruiters" className="hover:text-foreground transition-colors">For Recruiters</a>
          <a href="#candidates" className="hover:text-foreground transition-colors">For Candidates</a>
          <a href="#features" className="hover:text-foreground transition-colors">Features</a>
          <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/login"><Button variant="ghost" size="sm">Sign in</Button></Link>
          <Link to="/login"><Button size="sm">Get started <ArrowRight className="h-4 w-4" /></Button></Link>
        </div>
      </nav>
    </header>
  );
}

/* ---------- Reusable resume card preview ---------- */
interface ResumeCardProps {
  name: string;
  role: string;
  initials: string;
  avatarBg: string;
  experience: string;
  education: string;
  skills: string[];
  atsScore: number;
  status?: 'shortlisted' | 'reviewing' | 'analyzed';
  match?: number;
  className?: string;
}

function ResumeCard({ name, role, initials, avatarBg, experience, education, skills, atsScore, status, match, className = '' }: ResumeCardProps) {
  const scoreColor = atsScore >= 85 ? 'text-success' : atsScore >= 70 ? 'text-warning' : 'text-destructive';
  const scoreBg = atsScore >= 85 ? 'bg-success/10' : atsScore >= 70 ? 'bg-warning/10' : 'bg-destructive/10';

  return (
    <div className={`group rounded-xl border border-border bg-card p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:border-slate-300 ${className}`}>
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className="h-11 w-11 rounded-full flex items-center justify-center text-white text-sm font-semibold shrink-0"
            style={{ background: avatarBg }}
          >
            {initials}
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-sm text-foreground truncate">{name}</p>
            <p className="text-xs text-muted-foreground truncate">{role}</p>
          </div>
        </div>
        {status === 'shortlisted' && (
          <span className="inline-flex items-center gap-1 rounded-full bg-success/10 text-success text-[10px] font-medium px-2 py-0.5 shrink-0">
            <Star className="h-3 w-3 fill-current" /> Shortlisted
          </span>
        )}
        {status === 'reviewing' && (
          <span className="inline-flex items-center gap-1 rounded-full bg-warning/10 text-warning text-[10px] font-medium px-2 py-0.5 shrink-0">
            Reviewing
          </span>
        )}
        {status === 'analyzed' && (
          <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 text-primary text-[10px] font-medium px-2 py-0.5 shrink-0">
            <Sparkles className="h-3 w-3" /> Analyzed
          </span>
        )}
      </div>

      <div className="space-y-2 mb-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <Briefcase className="h-3.5 w-3.5 shrink-0" /> <span className="truncate">{experience}</span>
        </div>
        <div className="flex items-center gap-2">
          <GraduationCap className="h-3.5 w-3.5 shrink-0" /> <span className="truncate">{education}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {skills.map((s) => (
          <span key={s} className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground border border-border">
            {s}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div className="flex items-center gap-2">
          <div className={`inline-flex items-center gap-1 ${scoreBg} ${scoreColor} text-xs font-semibold rounded-md px-2 py-1`}>
            ATS {atsScore}
          </div>
          {match !== undefined && (
            <div className="inline-flex items-center gap-1 bg-primary/10 text-primary text-xs font-semibold rounded-md px-2 py-1">
              <Target className="h-3 w-3" /> {match}%
            </div>
          )}
        </div>
        <button className="text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
          View profile →
        </button>
      </div>
    </div>
  );
}

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <MarketingNav />

      {/* ============== HERO ============== */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid pointer-events-none opacity-60" aria-hidden />
        <div className="mx-auto max-w-7xl px-6 pt-16 pb-12 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left — copy */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-secondary border border-border text-muted-foreground mb-6">
                <span className="h-1.5 w-1.5 rounded-full bg-success" />
                Trusted by 12,400+ recruiters and candidates
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display tracking-tight text-foreground mb-5 leading-[1.05]">
                Hire faster.<br />
                Get hired smarter.
              </h1>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8 max-w-xl">
                The AI-powered resume platform recruiters use to screen, score, and shortlist candidates — and that job seekers use to optimize for the ATS and land interviews.
              </p>
              <div className="flex flex-wrap gap-3 mb-10">
                <Link to="/login">
                  <Button size="lg">Start screening <ArrowRight className="h-4 w-4" /></Button>
                </Link>
                <Link to="/resume-analyzer">
                  <Button size="lg" variant="outline">Try analyzer</Button>
                </Link>
              </div>
              <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-success" /> ATS scoring</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-success" /> Candidate ranking</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-success" /> AI shortlisting</div>
              </div>
            </div>

            {/* Right — stacked resume cards */}
            <div className="relative">
              <div className="absolute -top-6 -right-4 w-72 hidden md:block transform rotate-2">
                <ResumeCard
                  name="Sarah Chen"
                  role="Senior Product Designer"
                  initials="SC"
                  avatarBg="linear-gradient(135deg,#8B5CF6,#6366F1)"
                  experience="6 yrs · Figma, Stripe"
                  education="Stanford, B.S. HCI"
                  skills={['Figma', 'Design Systems', 'Research']}
                  atsScore={92}
                  status="shortlisted"
                  match={94}
                />
              </div>
              <div className="md:ml-12 md:mt-20 max-w-md transform md:-rotate-1">
                <ResumeCard
                  name="Marcus Johnson"
                  role="Full Stack Engineer"
                  initials="MJ"
                  avatarBg="linear-gradient(135deg,#0EA5E9,#2563EB)"
                  experience="4 yrs · React, Node, AWS"
                  education="MIT, B.S. Computer Science"
                  skills={['TypeScript', 'React', 'PostgreSQL', 'AWS']}
                  atsScore={88}
                  status="reviewing"
                  match={86}
                />
              </div>
            </div>
          </div>

          {/* Logo strip */}
          <div className="mt-16 pt-10 border-t border-border">
            <p className="text-xs uppercase tracking-wider text-muted-foreground text-center mb-5">
              Resumes optimized for hiring at
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-sm font-semibold text-muted-foreground/70">
              <span>Google</span><span>Stripe</span><span>Airbnb</span>
              <span>Notion</span><span>Linear</span><span>Vercel</span><span>Figma</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============== RECRUITER BENTO ============== */}
      <section id="recruiters" className="mx-auto max-w-7xl px-6 py-20">
        <div className="max-w-2xl mb-10">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md text-xs font-medium bg-primary/10 text-primary mb-4">
            <Users className="h-3.5 w-3.5" /> For Recruiters
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-display tracking-tight mb-3">
            Screen candidates in minutes, not days.
          </h2>
          <p className="text-muted-foreground">
            Upload up to 500 resumes at once. Our AI scores every candidate against your job description, surfaces the strongest matches, and lets you shortlist with one click.
          </p>
        </div>

        <div className="grid grid-cols-12 gap-4 md:gap-5">
          {/* Big left — candidate pipeline */}
          <div className="col-span-12 lg:col-span-7 rounded-xl border border-border bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-base font-semibold">Senior Product Designer · Pipeline</h3>
                <p className="text-xs text-muted-foreground mt-0.5">142 candidates · Ranked by AI match</p>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <button className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md border border-border hover:bg-secondary"><Filter className="h-3 w-3" /> Filter</button>
                <button className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md border border-border hover:bg-secondary"><Search className="h-3 w-3" /> Search</button>
              </div>
            </div>
            <div className="space-y-2.5">
              {[
                { name: 'Sarah Chen', role: 'Senior Product Designer · 6 yrs', match: 94, status: 'Shortlisted', initials: 'SC', bg: '#8B5CF6' },
                { name: 'Aisha Patel', role: 'Product Designer · 5 yrs', match: 91, status: 'Shortlisted', initials: 'AP', bg: '#EC4899' },
                { name: 'David Kim', role: 'Sr. UX Designer · 7 yrs', match: 88, status: 'Reviewing', initials: 'DK', bg: '#0EA5E9' },
                { name: 'Emma Rodriguez', role: 'Product Designer · 4 yrs', match: 84, status: 'Reviewing', initials: 'ER', bg: '#22C55E' },
                { name: 'James Wilson', role: 'UI/UX Designer · 3 yrs', match: 76, status: 'New', initials: 'JW', bg: '#F59E0B' },
              ].map((c) => (
                <div key={c.name} className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-slate-300 hover:bg-muted/40 transition-all">
                  <div className="h-9 w-9 rounded-full flex items-center justify-center text-white text-xs font-semibold shrink-0" style={{ background: c.bg }}>
                    {c.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{c.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{c.role}</p>
                  </div>
                  <div className="hidden sm:flex items-center gap-2">
                    <div className="w-24">
                      <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${c.match}%` }} />
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-foreground w-8 text-right">{c.match}%</span>
                  </div>
                  <span className={`text-[11px] font-medium px-2 py-0.5 rounded-md shrink-0 ${
                    c.status === 'Shortlisted' ? 'bg-success/10 text-success' :
                    c.status === 'Reviewing' ? 'bg-warning/10 text-warning' :
                    'bg-secondary text-muted-foreground'
                  }`}>{c.status}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right column */}
          <div className="col-span-12 lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 md:gap-5">
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-primary" />
                </div>
                <h3 className="text-sm font-semibold">AI screening summary</h3>
              </div>
              <p className="text-xs text-muted-foreground mb-4">142 resumes analyzed in 2.4s</p>
              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between"><span className="text-muted-foreground">Strong match</span><span className="font-semibold text-success">28</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Good match</span><span className="font-semibold text-warning">47</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Low match</span><span className="font-semibold text-muted-foreground">67</span></div>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <Award className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-semibold">Top candidate</h3>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 rounded-full flex items-center justify-center text-white text-xs font-semibold" style={{ background: 'linear-gradient(135deg,#8B5CF6,#6366F1)' }}>SC</div>
                <div>
                  <p className="text-sm font-medium">Sarah Chen</p>
                  <p className="text-xs text-muted-foreground">94% match · ATS 92</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="rounded-md bg-secondary p-2"><p className="text-base font-semibold text-foreground">6y</p><p className="text-[10px] text-muted-foreground">Experience</p></div>
                <div className="rounded-md bg-secondary p-2"><p className="text-base font-semibold text-foreground">12</p><p className="text-[10px] text-muted-foreground">Skills</p></div>
                <div className="rounded-md bg-secondary p-2"><p className="text-base font-semibold text-foreground">3</p><p className="text-[10px] text-muted-foreground">Roles</p></div>
              </div>
            </div>

            <div className="sm:col-span-2 lg:col-span-1 rounded-xl border border-border bg-card p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="h-4 w-4 text-success" />
                <h3 className="text-sm font-semibold">This week</h3>
              </div>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div><p className="text-2xl font-bold text-foreground">324</p><p className="text-[11px] text-muted-foreground">Resumes screened</p></div>
                <div><p className="text-2xl font-bold text-foreground">41</p><p className="text-[11px] text-muted-foreground">Shortlisted</p></div>
                <div><p className="text-2xl font-bold text-foreground">8</p><p className="text-[11px] text-muted-foreground">Hired</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============== CANDIDATE SECTION ============== */}
      <section id="candidates" className="bg-muted/40 border-y border-border">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md text-xs font-medium bg-success/10 text-success mb-4">
                <FileText className="h-3.5 w-3.5" /> For Candidates
              </div>
              <h2 className="text-3xl md:text-4xl font-bold font-display tracking-tight mb-3">
                Beat the ATS. Get the interview.
              </h2>
              <p className="text-muted-foreground mb-8 max-w-lg">
                Upload your resume, paste a job description, and instantly see how recruiters will rank you — with concrete, line-by-line suggestions to lift your score.
              </p>

              <div className="space-y-4">
                {[
                  { icon: Zap, title: 'Instant ATS score', desc: 'Get a real 0–100 ATS compatibility score in under 2 seconds.' },
                  { icon: Target, title: 'Keyword gap analysis', desc: 'See exactly which keywords from the job posting you’re missing.' },
                  { icon: Sparkles, title: 'AI rewrites', desc: 'Generate stronger, recruiter-tested bullet points for every role.', premium: true },
                ].map(({ icon: Icon, title, desc, premium }) => (
                  <div key={title} className="flex items-start gap-3">
                    <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold flex items-center gap-1.5">
                        {title}
                        {premium && <Lock className="h-3 w-3 text-primary" />}
                      </p>
                      <p className="text-sm text-muted-foreground mt-0.5">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Link to="/resume-analyzer">
                  <Button>Analyze my resume <ArrowRight className="h-4 w-4" /></Button>
                </Link>
              </div>
            </div>

            {/* Right — analyzed resume mock */}
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <div className="flex items-center justify-between mb-5 pb-5 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">resume_v4.pdf</p>
                    <p className="text-xs text-muted-foreground">Analyzed 2 minutes ago</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-success leading-none">87</p>
                  <p className="text-[10px] text-muted-foreground mt-1">ATS Score</p>
                </div>
              </div>

              <div className="space-y-3 mb-5">
                {[
                  { label: 'Keyword coverage', value: 92 },
                  { label: 'Readability', value: 84 },
                  { label: 'Format & structure', value: 95 },
                ].map((m) => (
                  <div key={m.label}>
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-muted-foreground">{m.label}</span>
                      <span className="font-semibold text-foreground">{m.value}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: `${m.value}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-lg bg-primary/5 border border-primary/20 p-3 mb-3">
                <p className="text-xs font-semibold text-foreground mb-1.5 flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-primary" /> AI suggestion
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Add "design systems" and "Figma" to your skills section — both appear in the job description.
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {['React', 'TypeScript', 'Product Design', 'User Research', '+5 more'].map((s) => (
                  <span key={s} className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground border border-border">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============== FEATURE GRID ============== */}
      <section id="features" className="mx-auto max-w-7xl px-6 py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-display tracking-tight mb-3">
            Everything you need to hire and get hired.
          </h2>
          <p className="text-muted-foreground">One platform. Two sides of the hiring table. Built on the same AI engine.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { icon: Search, title: 'Bulk resume screening', desc: 'Upload up to 500 resumes and rank them against any JD in seconds.' },
            { icon: Target, title: 'AI match scoring', desc: 'Transparent 0–100 score with per-skill, per-section breakdown.' },
            { icon: CheckCircle2, title: 'ATS compatibility', desc: 'Check parsing, formatting, and keyword density before you apply.' },
            { icon: Sparkles, title: 'Smart rewrites', desc: 'AI-generated bullet points that match recruiter expectations.' },
            { icon: TrendingUp, title: 'Version history', desc: 'Track every resume version and score improvement over time.' },
            { icon: Award, title: 'Candidate ranking', desc: 'Shortlist with confidence using explainable AI rankings.' },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-xl border border-border bg-card p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-slate-300">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-base font-semibold mb-1.5">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============== CTA ============== */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="rounded-2xl border border-border bg-card p-10 md:p-14 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-display tracking-tight mb-3">
            Ready to ship better hires?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-7">
            Join thousands of recruiters and candidates using CVInfinityBoost to make the resume the most useful part of hiring again.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/login"><Button size="lg">Start free <ArrowRight className="h-4 w-4" /></Button></Link>
            <Link to="/resume-analyzer"><Button size="lg" variant="outline">See live demo</Button></Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
