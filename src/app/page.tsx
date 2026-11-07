"use client";

import { useState } from "react";
import { MapPin, Calendar, Clock, DollarSign, Zap, CalendarClock } from "lucide-react";

export default function Home() {
  const [rideType, setRideType] = useState<"instant" | "scheduled">("instant");
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [scheduledDate, setScheduledDate] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");
  const [estimate, setEstimate] = useState<number | null>(null);
  const [bookingStatus, setBookingStatus] = useState<string | null>(null);

  const calculateEstimate = () => {
    if (!pickup || !dropoff) return;
    // Simple mock estimate: base $8 + random distance factor
    const base = 8;
    const distanceFactor = Math.random() * 15 + 5;
    const surge = rideType === "instant" ? 1.2 : 1.0;
    setEstimate(Math.round((base + distanceFactor) * surge * 100) / 100);
  };

  const handleBook = async () => {
    if (!pickup || !dropoff) {
      setBookingStatus("Please enter pickup and dropoff locations.");
      return;
    }
    if (rideType === "scheduled" && (!scheduledDate || !scheduledTime)) {
      setBookingStatus("Please select date and time for scheduled ride.");
      return;
    }

    // In real app: create ride in Supabase
    // const { data, error } = await supabase.from('rides').insert({...})
    
    setBookingStatus(
      rideType === "instant"
        ? "Ride requested! Searching for nearby drivers..."
        : `Scheduled ride booked for ${scheduledDate} at ${scheduledTime}. We'll confirm closer to the time.`
    );
    
    // Reset after success (mock)
    setTimeout(() => {
      setPickup("");
      setDropoff("");
      setEstimate(null);
    }, 3000);
  };

  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold holographic">
          Hop On. Ride Instantly or Schedule Ahead.
        </h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Premium rides across NW Ohio. Transparent pricing. Better experience for riders and drivers.
        </p>
      </section>

      {/* Ride Type Toggle */}
      <div className="flex justify-center gap-4">
        <button
          onClick={() => setRideType("instant")}
          className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition ${
            rideType === "instant"
              ? "bg-gold-500 text-black"
              : "bg-gray-800 text-gray-300 hover:bg-gray-700"
          }`}
        >
          <Zap className="w-5 h-5" />
          Instant Ride
        </button>
        <button
          onClick={() => setRideType("scheduled")}
          className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition ${
            rideType === "scheduled"
              ? "bg-gold-500 text-black"
              : "bg-gray-800 text-gray-300 hover:bg-gray-700"
          }`}
        >
          <CalendarClock className="w-5 h-5" />
          Schedule Ride
        </button>
      </div>

      {/* Booking Form */}
      <div className="max-w-2xl mx-auto bg-gray-900/50 border border-gold-500/30 rounded-2xl p-6 space-y-6 backdrop-blur-sm">
        <div className="space-y-4">
          <div className="relative">
            <MapPin className="absolute left-3 top-3 w-5 h-5 text-gold-400" />
            <input
              type="text"
              placeholder="Pickup location"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-black border border-gray-700 rounded-xl focus:border-gold-500 focus:outline-none"
            />
          </div>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 w-5 h-5 text-holographic" />
            <input
              type="text"
              placeholder="Dropoff location"
              value={dropoff}
              onChange={(e) => setDropoff(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-black border border-gray-700 rounded-xl focus:border-gold-500 focus:outline-none"
            />
          </div>

          {rideType === "scheduled" && (
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <Calendar className="absolute left-3 top-3 w-5 h-5 text-gold-400" />
                <input
                  type="date"
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-black border border-gray-700 rounded-xl focus:border-gold-500 focus:outline-none"
                />
              </div>
              <div className="relative">
                <Clock className="absolute left-3 top-3 w-5 h-5 text-gold-400" />
                <input
                  type="time"
                  value={scheduledTime}
                  onChange={(e) => setScheduledTime(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-black border border-gray-700 rounded-xl focus:border-gold-500 focus:outline-none"
                />
              </div>
            </div>
          )}
        </div>

        <button
          onClick={calculateEstimate}
          className="w-full py-3 bg-gray-800 hover:bg-gray-700 rounded-xl font-medium transition flex items-center justify-center gap-2"
        >
          <DollarSign className="w-5 h-5" />
          Get Price Estimate
        </button>

        {estimate && (
          <div className="text-center p-4 bg-gold-500/10 border border-gold-500/30 rounded-xl">
            <p className="text-2xl font-bold text-gold-400">${estimate.toFixed(2)}</p>
            <p className="text-sm text-gray-400">Estimated fare (includes base + distance)</p>
          </div>
        )}

        <button
          onClick={handleBook}
          className="w-full py-4 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-black font-bold rounded-xl text-lg transition transform hover:scale-[1.02]"
        >
          {rideType === "instant" ? "Request Instant Ride" : "Book Scheduled Ride"}
        </button>

        {bookingStatus && (
          <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl text-center text-green-400">
            {bookingStatus}
          </div>
        )}
      </div>

      {/* Features */}
      <section className="grid md:grid-cols-3 gap-6 mt-12">
        <div className="bg-gray-900/30 border border-gray-800 rounded-xl p-6 text-center">
          <Zap className="w-10 h-10 text-gold-400 mx-auto mb-3" />
          <h3 className="font-bold text-lg mb-2">Instant Matching</h3>
          <p className="text-sm text-gray-400">Nearby drivers notified in seconds for on-demand rides.</p>
        </div>
        <div className="bg-gray-900/30 border border-gray-800 rounded-xl p-6 text-center">
          <CalendarClock className="w-10 h-10 text-gold-400 mx-auto mb-3" />
          <h3 className="font-bold text-lg mb-2">Schedule Ahead</h3>
          <p className="text-sm text-gray-400">Book rides for airports, events, or future trips.</p>
        </div>
        <div className="bg-gray-900/30 border border-gray-800 rounded-xl p-6 text-center">
          <MapPin className="w-10 h-10 text-gold-400 mx-auto mb-3" />
          <h3 className="font-bold text-lg mb-2">Live Tracking</h3>
          <p className="text-sm text-gray-400">Real-time driver location and ETA once matched.</p>
        </div>
      </section>
    </div>
  );
}