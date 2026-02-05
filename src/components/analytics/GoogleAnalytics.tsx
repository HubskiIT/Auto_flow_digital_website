import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';

interface GoogleAnalyticsProps {
    measurementId?: string;
}

export const GoogleAnalytics: React.FC<GoogleAnalyticsProps> = ({
    measurementId = 'G-XXXXXXXXXX' // Replace with your actual GA4 Measurement ID
}) => {
    const location = useLocation();

    useEffect(() => {
        // Initialize GA4 only if measurement ID is provided and not placeholder
        if (measurementId && measurementId !== 'G-XXXXXXXXXX') {
            ReactGA.initialize(measurementId);
        }
    }, [measurementId]);

    useEffect(() => {
        // Track page views on route change
        if (measurementId && measurementId !== 'G-XXXXXXXXXX') {
            ReactGA.send({ hitType: 'pageview', page: location.pathname + location.search });
        }
    }, [location, measurementId]);

    return null; // This component doesn't render anything
};

// Custom event tracking helpers
export const trackEvent = (category: string, action: string, label?: string) => {
    ReactGA.event({
        category,
        action,
        label,
    });
};

export const trackButtonClick = (buttonName: string) => {
    trackEvent('Button', 'Click', buttonName);
};

export const trackFormSubmission = (formName: string) => {
    trackEvent('Form', 'Submit', formName);
};
