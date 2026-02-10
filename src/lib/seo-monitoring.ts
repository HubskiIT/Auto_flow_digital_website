/**
 * SEO Monitoring Utilities
 * 
 * Tools for tracking and monitoring SEO performance metrics:
 * - Core Web Vitals (LCP, FID, CLS)
 * - SEO-specific events (featured snippet views, FAQ clicks)
 * - Crawl error logging
 * - Search visibility tracking
 */

declare global {
    interface Window {
        gtag?: (...args: any[]) => void;
    }
}

export interface CoreWebVitalsMetrics {
    LCP?: number; // Largest Contentful Paint (ms)
    FID?: number; // First Input Delay (ms)
    CLS?: number; // Cumulative Layout Shift (score)
    FCP?: number; // First Contentful Paint (ms)
    TTFB?: number; // Time to First Byte (ms)
}

/**
 * Track SEO-related events in Google Analytics 4
 * 
 * @param eventName Name of the SEO event
 * @param params Additional parameters
 * @example
 * trackSEOEvent('featured_snippet_view', { snippet_type: 'faq', position: 0 });
 */
export const trackSEOEvent = (eventName: string, params?: Record<string, any>): void => {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', eventName, {
            event_category: 'SEO',
            ...params,
        });
    }
};

/**
 * Monitor Core Web Vitals
 * Uses Web Vitals library for accurate measurements
 * 
 * @param callback Function to call with metrics
 */
export const monitorCoreWebVitals = (callback: (metrics: CoreWebVitalsMetrics) => void): void => {
    if (typeof window === 'undefined') return;

    const metrics: CoreWebVitalsMetrics = {};

    // LCP - Largest Contentful Paint
    const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1] as any;
        metrics.LCP = lastEntry.renderTime || lastEntry.loadTime;
        callback(metrics);

        // Track in GA4
        trackSEOEvent('core_web_vital', {
            metric_name: 'LCP',
            metric_value: metrics.LCP,
            metric_rating: metrics.LCP < 2500 ? 'good' : metrics.LCP < 4000 ? 'needs_improvement' : 'poor'
        });
    });

    try {
        lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
    } catch (e) {
        // LCP not supported
    }

    // FID - First Input Delay
    const fidObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach((entry: any) => {
            metrics.FID = entry.processingStart - entry.startTime;
            callback(metrics);

            trackSEOEvent('core_web_vital', {
                metric_name: 'FID',
                metric_value: metrics.FID,
                metric_rating: metrics.FID < 100 ? 'good' : metrics.FID < 300 ? 'needs_improvement' : 'poor'
            });
        });
    });

    try {
        fidObserver.observe({ type: 'first-input', buffered: true });
    } catch (e) {
        // FID not supported
    }

    // CLS - Cumulative Layout Shift
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
            if (!(entry as any).hadRecentInput) {
                clsValue += (entry as any).value;
                metrics.CLS = clsValue;
                callback(metrics);
            }
        }

        trackSEOEvent('core_web_vital', {
            metric_name: 'CLS',
            metric_value: clsValue,
            metric_rating: clsValue < 0.1 ? 'good' : clsValue < 0.25 ? 'needs_improvement' : 'poor'
        });
    });

    try {
        clsObserver.observe({ type: 'layout-shift', buffered: true });
    } catch (e) {
        // CLS not supported
    }

    // FCP - First Contentful Paint
    const navigationObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntriesByType('paint');
        const fcpEntry = entries.find(entry => entry.name === 'first-contentful-paint');
        if (fcpEntry) {
            metrics.FCP = fcpEntry.startTime;
            callback(metrics);
        }
    });

    try {
        navigationObserver.observe({ type: 'paint', buffered: true });
    } catch (e) {
        // Paint timing not supported
    }

    // TTFB - Time to First Byte
    if (performance && performance.timing) {
        const ttfb = performance.timing.responseStart - performance.timing.requestStart;
        metrics.TTFB = ttfb;
        callback(metrics);
    }
};

/**
 * Track FAQ interactions for AEO optimization
 * Helps understand which FAQ items are most valuable
 */
export const trackFAQInteraction = (question: string, action: 'expand' | 'collapse'): void => {
    trackSEOEvent('faq_interaction', {
        question: question.substring(0, 100), // Truncate for GA4 limits
        action,
        timestamp: new Date().toISOString()
    });
};

/**
 * Track breadcrumb navigation clicks
 * Helps understand user navigation patterns
 */
export const trackBreadcrumbClick = (breadcrumbPath: string, position: number): void => {
    trackSEOEvent('breadcrumb_click', {
        path: breadcrumbPath,
        position,
    });
};

/**
 * Track internal search queries (if applicable)
 * Valuable for understanding content gaps
 */
export const trackSiteSearch = (query: string, resultsCount: number): void => {
    trackSEOEvent('site_search', {
        search_term: query,
        results_count: resultsCount,
    });
};

/**
 * Log crawl errors for debugging
 * Useful for identifying broken links or inaccessible content
 */
export const logCrawlError = (url: string, errorType: string, details?: string): void => {
    console.error(`[SEO Crawl Error] ${errorType} at ${url}`, details);

    trackSEOEvent('crawl_error', {
        url,
        error_type: errorType,
        details: details?.substring(0, 200),
    });
};

/**
 * Monitor social share events
 * Helps understand content virality
 */
export const trackSocialShare = (platform: string, url: string, title: string): void => {
    trackSEOEvent('social_share', {
        platform,
        url,
        title: title.substring(0, 100),
    });
};

/**
 * Initialize SEO monitoring
 * Call this once on app initialization
 */
export const initSEOMonitoring = (): void => {
    // Start Core Web Vitals monitoring
    monitorCoreWebVitals((metrics) => {
        console.log('[SEO Monitoring] Core Web Vitals:', metrics);
    });

    // Track page visibility
    if (typeof document !== 'undefined') {
        document.addEventListener('visibilitychange', () => {
            trackSEOEvent('page_visibility_change', {
                visibility_state: document.visibilityState,
            });
        });
    }

    // Track scroll depth for engagement
    if (typeof window !== 'undefined') {
        let maxScrollDepth = 0;
        const trackScrollDepth = () => {
            const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            if (scrollPercentage > maxScrollDepth) {
                maxScrollDepth = scrollPercentage;

                // Track at 25%, 50%, 75%, 100%
                const milestones = [25, 50, 75, 100];
                const milestone = milestones.find(m => maxScrollDepth >= m && maxScrollDepth < m + 5);
                if (milestone) {
                    trackSEOEvent('scroll_depth', {
                        percentage: milestone,
                    });
                }
            }
        };

        window.addEventListener('scroll', trackScrollDepth, { passive: true });
    }

    console.log('[SEO Monitoring] Initialized successfully');
};

/**
 * Generate SEO health report
 * Useful for regular SEO audits
 */
export const generateSEOHealthReport = (): {
    timestamp: string;
    metrics: CoreWebVitalsMetrics;
    recommendations: string[];
} => {
    const metrics: CoreWebVitalsMetrics = {};
    const recommendations: string[] = [];

    // Check meta tags
    if (typeof document !== 'undefined') {
        const title = document.querySelector('title');
        const description = document.querySelector('meta[name="description"]');
        const canonical = document.querySelector('link[rel="canonical"]');

        if (!title || title.textContent!.length < 30) {
            recommendations.push('Title tag is too short (should be 50-60 characters)');
        }

        if (!description || description.getAttribute('content')!.length < 120) {
            recommendations.push('Meta description is too short (should be 150-160 characters)');
        }

        if (!canonical) {
            recommendations.push('Missing canonical URL');
        }

        // Check for structured data
        const structuredData = document.querySelectorAll('script[type="application/ld+json"]');
        if (structuredData.length === 0) {
            recommendations.push('No structured data found');
        }

        // Check images for alt tags
        const images = document.querySelectorAll('img');
        const imagesWithoutAlt = Array.from(images).filter(img => !img.alt);
        if (imagesWithoutAlt.length > 0) {
            recommendations.push(`${imagesWithoutAlt.length} images missing alt attributes`);
        }

        // Check for mobile viewport
        const viewport = document.querySelector('meta[name="viewport"]');
        if (!viewport) {
            recommendations.push('Missing viewport meta tag for mobile optimization');
        }
    }

    return {
        timestamp: new Date().toISOString(),
        metrics,
        recommendations
    };
};
