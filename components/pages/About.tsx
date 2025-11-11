/* eslint-disable react/no-unescaped-entities */
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Users, Shield, Target, Mail } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="flex min-h-screen flex-col">

      <main className="flex-1 py-12">
        <div className="container max-w-4xl">
          <div className="text-center space-y-4 mb-12">
            <CheckCircle2 className="h-16 w-16 mx-auto text-primary" />
            <h1 className="text-4xl font-bold tracking-tight">About FactCheckNG</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Empowering Nigerians with verified, evidence-based information across all Local Government Areas
            </p>
          </div>

          <div className="space-y-8 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent className="text-base leading-relaxed">
                <p>
                  FactCheckNG is dedicated to combating misinformation across Nigeria by providing a
                  transparent, community-driven platform for verifying claims and rumors. We believe
                  that access to accurate information is fundamental to a thriving democracy and
                  healthy communities.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  How We Work
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-base leading-relaxed">
                <p>
                  Our team of trained researchers and fact-checkers investigate claims submitted by
                  the public. Every verification follows a rigorous process:
                </p>
                <ol className="list-decimal list-inside space-y-2 ml-4">
                  <li>Claims are reviewed and prioritized based on public interest and urgency</li>
                  <li>Researchers gather evidence from credible sources and primary documents</li>
                  <li>Multiple sources are cross-referenced to ensure accuracy</li>
                  <li>Findings are reviewed by senior fact-checkers before publication</li>
                  <li>All sources and methodology are made transparent to the public</li>
                </ol>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Our Team
                </CardTitle>
              </CardHeader>
              <CardContent className="text-base leading-relaxed">
                <p>
                  FactCheckNG is powered by a diverse team of journalists, researchers, data analysts,
                  and civic technology experts. Our researchers are distributed across Nigeria's
                  geopolitical zones, ensuring local expertise and cultural context in our
                  fact-checking work.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  Our Standards
                </CardTitle>
              </CardHeader>
              <CardContent className="text-base leading-relaxed">
                <p>
                  We adhere to the International Fact-Checking Network's Code of Principles,
                  maintaining non-partisanship, transparency in sources and funding, transparency in
                  methodology, honest corrections, and open corrections policy.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                Contact Us
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-base">
                Have questions or want to get involved? Reach out to us:
              </p>
              <p className="font-medium">
                Email: <a href="mailto:info@factcheckng.com" className="text-primary hover:underline">
                  info@factcheckng.com
                </a>
              </p>
              <p className="font-medium">
                Phone: +234 800 FACT CHECK
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

    </div>
  );
};

export default AboutPage;
