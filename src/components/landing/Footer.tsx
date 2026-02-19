import { Box, Container, Typography, Divider, Link } from '@mui/material';
import { landingColors as m3Colors, germanFlag } from '@/theme/m3-theme';

const footerLinks = {
  product: [
    { label: 'Fonctionnalités', href: '#features' },
    { label: 'Tarifs', href: '#pricing' },
    { label: 'Témoignages', href: '#testimonials' },
    { label: 'FAQ', href: '#faq' },
  ],
  resources: [
    { label: 'Guide Chancenkarte', href: '#' },
    { label: 'Reconnaissance des diplômes', href: '#' },
    { label: 'Compte bloqué', href: '#' },
    { label: 'Blog', href: '#' },
  ],
  company: [
    { label: 'À propos', href: '#' },
    { label: 'Contact', href: '#' },
    { label: 'Mentions légales', href: '#' },
    { label: 'Confidentialité', href: '#' },
  ],
};

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: m3Colors.surfaceContainerLow,
        pt: { xs: 6, md: 8 },
        pb: { xs: 6, md: 8 },
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '6px',
          background: `linear-gradient(to right, 
            ${germanFlag.black} 0%, ${germanFlag.black} 33%, 
            ${germanFlag.red} 33%, ${germanFlag.red} 66%, 
            ${germanFlag.gold} 66%, ${germanFlag.gold} 100%)`,
        },
      }}
    >
      <Container maxWidth="lg">
        {/* Main Footer Content */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
            gap: 4,
            mb: 6,
          }}
        >
          {/* Brand */}
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: m3Colors.primary,
                mb: 2,
              }}
            >
              ALLEMAGNE2026
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: m3Colors.onSurfaceVariant,
                lineHeight: 1.6,
                maxWidth: 280,
              }}
            >
              Guide complet pour immigrer en Allemagne.
              De la première démarche à l'installation,
              nous vous accompagnons à chaque étape.
            </Typography>
          </Box>

          {/* Product Links */}
          <Box>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 600,
                color: m3Colors.onSurface,
                mb: 2,
              }}
            >
              Produit
            </Typography>
            {footerLinks.product.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                underline="none"
                sx={{
                  display: 'block',
                  py: 0.5,
                  color: m3Colors.onSurfaceVariant,
                  '&:hover': {
                    color: m3Colors.primary,
                  },
                }}
              >
                {link.label}
              </Link>
            ))}
          </Box>

          {/* Resources Links */}
          <Box>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 600,
                color: m3Colors.onSurface,
                mb: 2,
              }}
            >
              Ressources
            </Typography>
            {footerLinks.resources.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                underline="none"
                sx={{
                  display: 'block',
                  py: 0.5,
                  color: m3Colors.onSurfaceVariant,
                  '&:hover': {
                    color: m3Colors.primary,
                  },
                }}
              >
                {link.label}
              </Link>
            ))}
          </Box>

          {/* Company Links */}
          <Box>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 600,
                color: m3Colors.onSurface,
                mb: 2,
              }}
            >
              Entreprise
            </Typography>
            {footerLinks.company.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                underline="none"
                sx={{
                  display: 'block',
                  py: 0.5,
                  color: m3Colors.onSurfaceVariant,
                  '&:hover': {
                    color: m3Colors.primary,
                  },
                }}
              >
                {link.label}
              </Link>
            ))}
          </Box>
        </Box>

        <Divider sx={{ borderColor: m3Colors.outlineVariant, mb: 4 }} />

        {/* Bottom Footer */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: m3Colors.onSurfaceVariant,
            }}
          >
            © 2026 ALLEMAGNE2026. Tous droits réservés.
          </Typography>

          <Typography
            variant="caption"
            sx={{
              color: m3Colors.onSurfaceVariant,
              textAlign: { xs: 'center', sm: 'right' },
            }}
          >
            ALLEMAGNE2026 n'est pas une agence gouvernementale.
            Nous fournissons des informations et des guides basés sur des sources officielles.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
