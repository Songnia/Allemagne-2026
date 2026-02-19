import { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  TextField,
  InputAdornment,
  Tabs,
  Tab,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
} from '@mui/material';
import { Search, CheckCircle, Lock, AccessTime, Close, ArrowBack } from '@mui/icons-material';
import { m3Colors } from '@/theme/m3-theme';
import { useAppStore } from '@/store/useAppStore';

const categories = [
  { id: 'all', label: 'Tous' },
  { id: 'introduction', label: 'Introduction' },
  { id: 'chancenkarte', label: 'Chancenkarte' },
  { id: 'documents', label: 'Documents' },
  { id: 'emploi', label: 'Emploi' },
  { id: 'visa', label: 'Visa' },
  { id: 'installation', label: 'Installation' },
];

function ArticlesView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null);
  
  const { articles, subscription, markArticleAsRead } = useAppStore();

  const filteredArticles = articles.filter((article) => {
    const matchesSearch = 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleArticleClick = (articleId: string) => {
    const article = articles.find(a => a.id === articleId);
    if (article && !article.isRead && article.requiredTier <= subscription.tier) {
      markArticleAsRead(articleId);
    }
    setSelectedArticle(articleId);
  };

  const handleCloseArticle = () => {
    setSelectedArticle(null);
  };

  const selectedArticleData = selectedArticle ? articles.find(a => a.id === selectedArticle) : null;

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: m3Colors.onSurface,
            mb: 1,
          }}
        >
          Articles
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: m3Colors.onSurfaceVariant,
          }}
        >
          Explorez nos guides détaillés sur l'immigration allemande.
        </Typography>
      </Box>

      {/* Search */}
      <TextField
        fullWidth
        placeholder="Rechercher un article..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search sx={{ color: m3Colors.onSurfaceVariant }} />
            </InputAdornment>
          ),
        }}
        sx={{
          mb: 3,
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            backgroundColor: m3Colors.surfaceContainerLow,
            '& fieldset': {
              borderColor: 'transparent',
            },
            '&:hover fieldset': {
              borderColor: m3Colors.outline,
            },
            '&.Mui-focused fieldset': {
              borderColor: m3Colors.primary,
            },
          },
        }}
      />

      {/* Category Tabs */}
      <Tabs
        value={selectedCategory}
        onChange={(_, value) => setSelectedCategory(value)}
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          mb: 3,
          '& .MuiTabs-indicator': {
            backgroundColor: m3Colors.primary,
          },
          '& .MuiTab-root': {
            textTransform: 'none',
            color: m3Colors.onSurfaceVariant,
            '&.Mui-selected': {
              color: m3Colors.primary,
              fontWeight: 600,
            },
          },
        }}
      >
        {categories.map((cat) => (
          <Tab key={cat.id} value={cat.id} label={cat.label} />
        ))}
      </Tabs>

      {/* Articles Grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
          gap: 3,
        }}
      >
        {filteredArticles.map((article) => {
          const isLocked = article.requiredTier === 'complete' && subscription.tier !== 'complete';
          
          return (
            <Card
              key={article.id}
              elevation={0}
              onClick={() => !isLocked && handleArticleClick(article.id)}
              sx={{
                backgroundColor: article.isRead
                  ? `${m3Colors.primary}05`
                  : m3Colors.surfaceContainerLow,
                borderRadius: '12px',
                border: `1px solid ${
                  article.isRead ? m3Colors.primary : m3Colors.outlineVariant
                }`,
                cursor: isLocked ? 'not-allowed' : 'pointer',
                opacity: isLocked ? 0.6 : 1,
                transition: 'all 0.2s ease',
                '&:hover': !isLocked ? {
                  boxShadow: '0px 4px 8px 3px rgba(0, 0, 0, 0.1)',
                  borderColor: m3Colors.primary,
                } : {},
              }}
            >
              <CardContent sx={{ p: 3 }}>
                {/* Header */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Chip
                    size="small"
                    label={article.category}
                    sx={{
                      backgroundColor: m3Colors.primaryContainer,
                      color: m3Colors.onPrimaryContainer,
                      fontWeight: 500,
                      textTransform: 'capitalize',
                    }}
                  />
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    {article.isRead && (
                      <CheckCircle sx={{ color: m3Colors.primary, fontSize: 18 }} />
                    )}
                    {isLocked && (
                      <Lock sx={{ color: m3Colors.onSurfaceVariant, fontSize: 18 }} />
                    )}
                  </Box>
                </Box>

                {/* Title */}
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: m3Colors.onSurface,
                    mb: 1,
                    fontSize: '18px',
                  }}
                >
                  {article.title}
                </Typography>

                {/* Excerpt */}
                <Typography
                  variant="body2"
                  sx={{
                    color: m3Colors.onSurfaceVariant,
                    mb: 2,
                    lineHeight: 1.6,
                  }}
                >
                  {article.excerpt}
                </Typography>

                {/* Footer */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <AccessTime sx={{ fontSize: 14, color: m3Colors.onSurfaceVariant }} />
                    <Typography variant="caption" sx={{ color: m3Colors.onSurfaceVariant }}>
                      {article.readTime} min
                    </Typography>
                  </Box>
                  {isLocked && (
                    <Chip
                      size="small"
                      label="Complete"
                      sx={{
                        height: 20,
                        fontSize: '10px',
                        backgroundColor: m3Colors.surfaceContainerHighest,
                        color: m3Colors.onSurfaceVariant,
                      }}
                    />
                  )}
                </Box>
              </CardContent>
            </Card>
          );
        })}
      </Box>

      {/* Article Dialog */}
      <Dialog
        open={!!selectedArticle}
        onClose={handleCloseArticle}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '16px',
            backgroundColor: m3Colors.surface,
            maxHeight: '90vh',
          },
        }}
      >
        {selectedArticleData && (
          <>
            <DialogTitle sx={{ p: 3, pb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <IconButton onClick={handleCloseArticle} sx={{ color: m3Colors.onSurfaceVariant }}>
                  <ArrowBack />
                </IconButton>
                <Box sx={{ flex: 1 }}>
                  <Chip
                    size="small"
                    label={selectedArticleData.category}
                    sx={{
                      mb: 1,
                      backgroundColor: m3Colors.primaryContainer,
                      color: m3Colors.onPrimaryContainer,
                    }}
                  />
                  <Typography variant="h5" sx={{ fontWeight: 600, color: m3Colors.onSurface }}>
                    {selectedArticleData.title}
                  </Typography>
                </Box>
                <IconButton onClick={handleCloseArticle} sx={{ color: m3Colors.onSurfaceVariant }}>
                  <Close />
                </IconButton>
              </Box>
            </DialogTitle>
            <Divider />
            <DialogContent sx={{ p: 3 }}>
              <Box
                sx={{
                  '& h2': {
                    fontSize: '24px',
                    fontWeight: 600,
                    color: m3Colors.onSurface,
                    mt: 3,
                    mb: 2,
                  },
                  '& h3': {
                    fontSize: '20px',
                    fontWeight: 600,
                    color: m3Colors.onSurface,
                    mt: 3,
                    mb: 2,
                  },
                  '& p': {
                    color: m3Colors.onSurfaceVariant,
                    lineHeight: 1.8,
                    mb: 2,
                  },
                  '& ul, & ol': {
                    pl: 3,
                    mb: 2,
                  },
                  '& li': {
                    color: m3Colors.onSurfaceVariant,
                    lineHeight: 1.8,
                    mb: 1,
                  },
                  '& strong': {
                    color: m3Colors.onSurface,
                    fontWeight: 600,
                  },
                  '& a': {
                    color: m3Colors.primary,
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  },
                  '& table': {
                    width: '100%',
                    borderCollapse: 'collapse',
                    mb: 3,
                  },
                  '& th, & td': {
                    border: `1px solid ${m3Colors.outlineVariant}`,
                    p: 1.5,
                    textAlign: 'left',
                  },
                  '& th': {
                    backgroundColor: m3Colors.surfaceContainer,
                    fontWeight: 600,
                    color: m3Colors.onSurface,
                  },
                }}
                dangerouslySetInnerHTML={{ __html: selectedArticleData.content }}
              />
            </DialogContent>
          </>
        )}
      </Dialog>
    </Box>
  );
}

export default ArticlesView;
