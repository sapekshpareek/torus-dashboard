interface RegionFilterProps {
    regions: string[];
    selectedRegion: string | null;
    onRegionChange: (region: string | null) => void;
}

export default function RegionFilter({
    regions,
    selectedRegion,
    onRegionChange,
}: RegionFilterProps) {
    return (
        <div>
            <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                Filter by Region
            </label>
            <select
                id="region"
                value={selectedRegion || ''}
                onChange={(e) => onRegionChange(e.target.value || null)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
                <option value="">All Regions</option>
                {regions.map((region) => (
                    <option key={region} value={region}>
                        {region}
                    </option>
                ))}
            </select>
        </div>
    );
} 