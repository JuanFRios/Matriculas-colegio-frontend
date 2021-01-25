import { Group } from "../models/group.model";

export interface LoadGroups {
    groups: Group[];
}

export interface Quota{
    availableQuota: number;
}