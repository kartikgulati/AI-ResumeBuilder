import { SubscriptionLevel } from "./subscription";

export function canCreateResume(
    subscriptionLevel:SubscriptionLevel,
currentResumeCount: number,) {
    const maxResumesMap : Record<SubscriptionLevel, number> = {
        free: 1,
        premium: 3,
        pro: Infinity
    };
    const maxResumes = maxResumesMap[subscriptionLevel];
    return currentResumeCount < maxResumesMap[subscriptionLevel];
}

export function canUseAiTool (subscriptionLevel: SubscriptionLevel) {
    return subscriptionLevel !== "free";
}

export function canUseCustomization(subscriptionLevel: SubscriptionLevel) {
    return subscriptionLevel !== "pro";
}
