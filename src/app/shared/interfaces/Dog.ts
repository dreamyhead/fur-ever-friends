export interface Dog {
	id: string;
	name: string;
	gender: string;
	breed: string;
	imageUrl: string;
	message?: string[];
	status?: string;
	liked: boolean;
}