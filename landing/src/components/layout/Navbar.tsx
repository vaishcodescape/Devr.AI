import React, { useState, useEffect } from 'react';
import {
    AppBar,
    Toolbar,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Box,
    Container,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Menu as MenuIcon, X as CloseIcon, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import Button from '../ui/Button';

// Styled AppBar with glassmorphism
const StyledAppBar = styled(AppBar, {
    shouldForwardProp: (prop) => prop !== 'scrolled',
})<{ scrolled: boolean }>(({ scrolled }) => ({
    background: scrolled
        ? 'rgba(9, 9, 11, 0.8)'
        : 'transparent',
    backdropFilter: scrolled ? 'blur(20px)' : 'none',
    boxShadow: scrolled
        ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
        : 'none',
    borderBottom: scrolled ? '1px solid rgba(63, 63, 70, 0.5)' : 'none',
    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
}));

// Styled nav link
const NavLink = styled('a')({
    position: 'relative',
    fontSize: '0.875rem',
    fontWeight: 500,
    color: '#d4d4d8',
    textDecoration: 'none',
    transition: 'color 0.3s',
    '&:hover': {
        color: '#ffffff',
    },
    '&::after': {
        content: '""',
        position: 'absolute',
        bottom: '-4px',
        left: 0,
        width: 0,
        height: '2px',
        background: 'linear-gradient(90deg, #4ade80, #22d3ee)',
        transition: 'width 0.3s',
    },
    '&:hover::after': {
        width: '100%',
    },
});

// Styled Drawer
const StyledDrawer = styled(Drawer)({
    '& .MuiDrawer-paper': {
        background: 'rgba(9, 9, 11, 0.95)',
        backdropFilter: 'blur(20px)',
        borderLeft: '1px solid rgba(63, 63, 70, 0.5)',
        width: '280px',
    },
});

const Navbar: React.FC = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const navLinks = [
        { name: 'Features', href: isHomePage ? '#features' : '/#features' },
        { name: 'How It Works', href: isHomePage ? '#how-it-works' : '/#how-it-works' },
        { name: 'Integrations', href: isHomePage ? '#integrations' : '/#integrations' },
    ];

    const drawer = (
        <Box sx={{ pt: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', px: 2, mb: 2 }}>
                <IconButton onClick={handleDrawerToggle} sx={{ color: '#d4d4d8' }}>
                    <CloseIcon size={24} />
                </IconButton>
            </Box>
            <List>
                {navLinks.map((link, index) => (
                    <motion.div
                        key={link.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <ListItem
                            component="a"
                            href={link.href}
                            onClick={handleDrawerToggle}
                            sx={{
                                color: '#d4d4d8',
                                py: 2,
                                px: 3,
                                borderRadius: '8px',
                                mx: 2,
                                mb: 1,
                                transition: 'all 0.3s',
                                '&:hover': {
                                    backgroundColor: 'rgba(63, 63, 70, 0.5)',
                                    color: '#ffffff',
                                },
                            }}
                        >
                            <ListItemText primary={link.name} />
                        </ListItem>
                    </motion.div>
                ))}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: navLinks.length * 0.1 }}
                >
                    <Box sx={{ px: 2, pt: 2 }}>
                        <Button
                            variant="primary"
                            href={isHomePage ? '#waitlist' : '/#waitlist'}
                            onClick={handleDrawerToggle}
                            fullWidth
                            className="!py-3"
                        >
                            Join Waitlist
                        </Button>
                    </Box>
                </motion.div>
            </List>
        </Box>
    );

    return (
        <>
            <StyledAppBar position="fixed" scrolled={scrolled} elevation={0}>
                <Container maxWidth="lg">
                    <Toolbar sx={{ minHeight: '64px !important', px: { xs: 0 } }}>
                        {/* Logo */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            style={{ display: 'flex', alignItems: 'center', gap: '8px', flexGrow: 1 }}
                        >
                            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
                                <Box sx={{ position: 'relative' }}>
                                    <Sparkles
                                        size={20}
                                        style={{
                                            color: '#4ade80',
                                            transition: 'color 0.3s',
                                        }}
                                    />
                                </Box>
                                <Box
                                    component="span"
                                    sx={{
                                        fontSize: '1.25rem',
                                        fontWeight: 700,
                                        background: 'linear-gradient(90deg, #4ade80, #22d3ee, #10b981)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        backgroundClip: 'text',
                                    }}
                                >
                                    Devr.AI
                                </Box>
                            </Link>
                        </motion.div>

                        {/* Desktop Navigation */}
                        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 3 }}>
                            {navLinks.map((link, index) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <NavLink href={link.href}>{link.name}</NavLink>
                                </motion.div>
                            ))}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                <Button
                                    variant="primary"
                                    href={isHomePage ? '#waitlist' : '/#waitlist'}
                                    className="!px-5 !py-1.5 !text-sm !min-w-0"
                                >
                                    Join Waitlist
                                </Button>
                            </motion.div>
                        </Box>

                        {/* Mobile Menu Button */}
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="end"
                            onClick={handleDrawerToggle}
                            sx={{
                                display: { md: 'none' },
                                color: '#d4d4d8',
                                p: 1,
                                '&:hover': {
                                    backgroundColor: 'rgba(63, 63, 70, 0.5)',
                                },
                            }}
                        >
                            <MenuIcon size={20} />
                        </IconButton>
                    </Toolbar>
                </Container>
            </StyledAppBar>

            {/* Mobile Drawer */}
            <StyledDrawer
                variant="temporary"
                anchor="right"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true,
                }}
            >
                {drawer}
            </StyledDrawer>

            {/* Toolbar spacer */}
            <Toolbar sx={{ minHeight: '64px !important' }} />
        </>
    );
};

export default Navbar;
