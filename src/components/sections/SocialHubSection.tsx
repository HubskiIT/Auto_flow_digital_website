import React from 'react';
import {
    LinkedinIcon,
    InstagramIcon,
    FacebookIcon,
    TiktokIcon,
    YoutubeIcon,
    MicIcon,
    GoogleIcon,
    MailIcon,
    MegaphoneIcon,
    ArrowRightIcon
} from '../common/Icons';

const socialChannels = [
    {
        name: "LinkedIn",
        icon: <LinkedinIcon />,
        description: "Case studies i biznesowe strategie",
        link: "#", // To be updated
        color: "hover:text-[#0077b5]"
    },
    {
        name: "Instagram",
        icon: <InstagramIcon />,
        description: "Tips & tricks w formacie wizualnym",
        link: "#",
        color: "hover:text-[#E1306C]"
    },
    {
        name: "Facebook",
        icon: <FacebookIcon />,
        description: "Społeczność i nowości",
        link: "#",
        color: "hover:text-[#1877F2]"
    },
    {
        name: "TikTok",
        icon: <TiktokIcon />,
        description: "Szybkie hacki automatyzacji",
        link: "#",
        color: "hover:text-[#00f2ea]"
    },
    {
        name: "YouTube",
        icon: <YoutubeIcon />,
        description: "Tutoriale i głębokie analizy",
        link: "#",
        color: "hover:text-[#FF0000]"
    },
    {
        name: "Podcast",
        icon: <MicIcon />,
        description: "AI w Biznesie - audio series",
        link: "#",
        color: "hover:text-purple-400"
    },
    {
        name: "Google",
        icon: <GoogleIcon />,
        description: "Opinie i lokalizacja",
        link: "#",
        color: "hover:text-green-500"
    },
    {
        name: "Newsletter",
        icon: <MailIcon />,
        description: "Tygodniowa dawka wiedzy",
        link: "#",
        color: "hover:text-yellow-400"
    },
    {
        name: "Konkursy",
        icon: <MegaphoneIcon />,
        description: "Wygraj darmowe wdrożenia",
        link: "#",
        color: "hover:text-orange-500"
    }
];

const SocialHubSection = () => {
    return (
        <section className="py-20 relative">
            <div className="container">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">
                        Bądźmy w <span className="text-gradient">Kontakcie</span>
                    </h2>
                    <p className="text-xl text-text-secondary">
                        Wybierz swój ulubiony kanał i ucz się automatyzacji tak, jak lubisz.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {socialChannels.map((channel, index) => (
                        <a
                            key={index}
                            href={channel.link}
                            target={channel.link !== '#' ? "_blank" : "_self"}
                            rel="noopener noreferrer"
                            className="group card p-6 border border-white/5 bg-white/5 backdrop-blur-sm rounded-2xl flex items-center gap-6 hover:bg-white/10 transition-all duration-300"
                        >
                            <div className={`p-4 rounded-xl bg-white/5 group-hover:bg-white/10 transition-colors ${channel.color}`}>
                                {React.cloneElement(channel.icon as React.ReactElement, { size: 32 })}
                            </div>

                            <div className="flex-1">
                                <h3 className="text-lg font-bold mb-1 flex items-center justify-between">
                                    {channel.name}
                                    <span className="opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1">
                                        <ArrowRightIcon />
                                    </span>
                                </h3>
                                <p className="text-sm text-text-secondary">
                                    {channel.description}
                                </p>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SocialHubSection;
