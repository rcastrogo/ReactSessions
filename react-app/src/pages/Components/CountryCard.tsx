import { formatNumber } from "../../lib/utils";

interface CountryCardProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  country: any; 
}

export default function CountryCard({ country }: CountryCardProps) {
  return (
    <div className="bg-card border rounded-2xl shadow-md p-5 hover:shadow-xl transition max-w-md w-full">
      {/* Flag */}
      <img
        src={country.flags?.png}
        alt={country.flags?.alt || country.name.common}
        className="w-full max-h-20 object-cover rounded-xl mb-4"
      />

      {/* Title */}
      <h2 className="text-2xl font-bold mb-1">{country.name.common}</h2>
      <p className="text-muted-foreground mb-4">
        {country.name.official}
      </p>

      {/* Info grid */}
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <p className="font-semibold">Capital</p>
          <p>{country.capital?.[0] || "—"}</p>
        </div>

        <div>
          <p className="font-semibold">Region</p>
          <p>{country.region}</p>
        </div>

        <div>
          <p className="font-semibold">Subregion</p>
          <p>{country.subregion}</p>
        </div>

        <div>
          <p className="font-semibold">Population</p>
          <p>{formatNumber(country.population)}</p>
        </div>

        <div>
          <p className="font-semibold">CCA2</p>
          <p>{country.cca2}</p>
        </div>

        <div>
          <p className="font-semibold">CCA3</p>
          <p>{country.cca3}</p>
        </div>
      </div>

      {/* Maps */}
      <div className="mt-4 flex gap-3">
        <a
          href={country.maps?.googleMaps}
          target="_blank"
          className="text-primary underline text-sm hover:text-primary/70"
        >
          Google Maps
        </a>

        <a
          href={country.maps?.openStreetMaps}
          target="_blank"
          className="text-primary underline text-sm hover:text-primary/70"
        >
          OpenStreetMap
        </a>
      </div>
    </div>
  );
}
