import Link from "next/link";
import { TrendingUp } from "lucide-react";

const footerLinks = {
  product: [
    { label: "Features", href: "/#preview" },
    { label: "Demo", href: "/#preview" },
    { label: "Security", href: "/legal" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Blog", href: "/about" },
    { label: "Careers", href: "/about" },
  ],
  legal: [
    { label: "Privacy", href: "/legal" },
    { label: "Terms", href: "/legal" },
    { label: "Cookie Policy", href: "/legal" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold text-background">
                AuraWealth
              </span>
            </div>
            <p className="text-background/60 max-w-sm leading-relaxed">
              The modern platform for tracking and managing your investments. Simple, secure, and beautifully designed.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-semibold text-background mb-4">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-background/60 hover:text-background transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-background mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-background/60 hover:text-background transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold text-background mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-background/60 hover:text-background transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-background/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-background/60 text-sm">
            &copy; {new Date().getFullYear()} AuraWealth. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/login" className="text-sm text-background/60 hover:text-background transition-colors">
              Login
            </Link>
            <Link href="/signup" className="text-sm text-primary hover:text-primary/80 transition-colors font-medium">
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
