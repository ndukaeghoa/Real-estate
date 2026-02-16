export const ListingCard = ({ listing, action }) => (
  <article className="bg-white border rounded-lg overflow-hidden shadow-sm">
    <img
      src={listing.photos?.[0] || 'https://images.unsplash.com/photo-1494526585095-c41746248156?w=1000'}
      alt={listing.title}
      className="w-full h-48 object-cover"
    />
    <div className="p-4">
      <h3 className="font-semibold text-lg">{listing.title}</h3>
      <p className="text-slate-600 text-sm">{listing.location} • {listing.address}</p>
      <p className="font-semibold mt-2">${listing.rent}/mo • {listing.bedrooms} bed</p>
      <p className="text-xs mt-1">Amenities: {(listing.amenities || []).join(', ') || 'N/A'}</p>
      {action && <div className="mt-3">{action}</div>}
    </div>
  </article>
);
