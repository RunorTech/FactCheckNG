import { RootState } from '@/utils/store';
import { Home, MapPin, Users, BookOpen } from 'lucide-react';
import { useSelector } from 'react-redux';

export const mainLinks = [
    { icon: Home, label: 'Feed', path: '/' },
    { icon: MapPin, label: 'Browse LGAs', path: '/lgas' },
    { icon: Users, label: 'Community', path: '/user' },
    { icon: BookOpen, label: 'About', path: '/about' },
];

export const careers = [
    // Tech
    "Software Engineer",
    "Frontend Developer",
    "Backend Developer",
    "Fullstack Developer",
    "DevOps Engineer",
    "Data Scientist",
    "AI Engineer",
    "Machine Learning Engineer",
    "Blockchain Developer",
    "Cybersecurity Analyst",
    "Cloud Architect",
    "Mobile App Developer",
    "Product Manager",
    "UI/UX Designer",
    // Media
    "Journalist",
    "News Reporter",
    "Video Editor",
    "Photographer",
    "Content Creator",
    "Social Media Manager",
    "Public Relations Officer",
    "Scriptwriter",
    "Film Producer",
    "Sound Engineer",
    "Radio Broadcaster",
    "TV Presenter",
    // Medical
    "Medical Doctor",
    "Nurse",
    "Pharmacist",
    "Laboratory Scientist",
    "Radiologist",
    "Dentist",
    "Surgeon",
    "Physiotherapist",
    "Psychologist",
    "Optometrist",
    // Business
    "Accountant",
    "Financial Analyst",
    "Business Analyst",
    "Human Resource Manager",
    "Operations Manager",
    "Sales Executive",
    "Marketing Manager",
    "Entrepreneur",
    // Education
    "Teacher",
    "Lecturer",
    "Researcher",
    "Education Consultant",
    "School Administrator",
    // Creative / Arts
    "Graphic Designer",
    "Illustrator",
    "Animator",
    "Fashion Designer",
    "Music Producer",
    "Actor",
    "Voice Over Artist",
    "Dancer",
    "Makeup Artist",
    // Others
    "Lawyer",
    "Architect",
    "Civil Engineer",
    "Mechanical Engineer",
    "Electrical Engineer",
    "Plumber",
    "Carpenter",
    "Chef",
    "Event Planner",
    "Driver",
]

export const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });
export const base64ToFile = (base64: string, fileName: string): File => {
    const arr = base64.split(',');
    const mime = arr[0].match(/:(.*?);/)?.[1] || '';
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], fileName, { type: mime });
};
export const sharedQueryKeys = {
    getClaims: "GET_CLAIMS",
    getClaim: "GET_CLAIM",
    getRelatedClaim: "GET_RELATED_CLAIM",
    getUsers: "GET_USERS"


};
export const DEFAULT_DEBOUNCE_DELAY = 300

export function timeAgoOrIn(dateString: string): string {
    const now = new Date();
    const target = new Date(dateString);
    const diff = target.getTime() - now.getTime();

    const absDiff = Math.abs(diff);
    const seconds = Math.floor(absDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    const format = (value: number, unit: string) =>
        `${value} ${unit}${value !== 1 ? "s" : ""}`;

    const result =
        years > 0
            ? format(years, "year")
            : months > 0
                ? format(months, "month")
                : days > 0
                    ? format(days, "day")
                    : hours > 0
                        ? format(hours, "hour")
                        : minutes > 0
                            ? format(minutes, "minute")
                            : format(seconds, "second");

    return diff < 0 ? `${result} ago` : `in ${result}`;
}

export const allClaimsEvents = {
    created: "claim:created",
    updated: "claim:updated",
    deleted: "claim:deleted",
};
interface VerdictProps {
    likes?: number;
    dislikes?: number;
}

export const getVerdictFromReactions = ({
    likes = 0,
    dislikes = 0,
}: VerdictProps): VerdictStatus => {
    if (likes > dislikes) {
        return "true";
    } else if (likes < dislikes) {
        return "false";
    } else {
        return "pending";
    }
};

export const useConstantUtils = () => {
    const currentUserID = useSelector(
        (state: RootState) => state.shared.currentUserID
    );

    const hasProfile = useSelector(
        (state: RootState) => state.shared.hasProfile
    );

    return { hasProfile, currentUserID }
}