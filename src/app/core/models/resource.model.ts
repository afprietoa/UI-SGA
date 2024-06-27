export interface Resource {
    resourceId: number;
    name: string;
    type: 'RIVER' | 'RAVINE' | 'STREAM' | 'CREEK' | 'BROOK' | 'CANAL' | 'RESERVOIR' | 'LAKE' | 'POND' | 'WETLAND' | 'AQUIFER' | 'GROUNDWATER' | 'SPRING' | 'WASH' | 'ESTUARY' | 'DELTA' | 'LAGOON' | 'MARSH' | 'BOG' | 'SWAMP';
    latitude: number;
    longitude: number;
    location: string;
}