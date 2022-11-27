require 'open-uri'
require 'json'

puts 'Nettoyons la DB...'

# Movie.destroy_all

puts 'Création des movies..'

url = "https://tmdb.lewagon.com/movie/top_rated"


50.times do |i|
  puts "Importing movies from page #{i + 1}"
  movies = JSON.parse(URI.open("#{url}?page=#{i + 1}").read)['results']
  movies.each do |movie|
    puts "Creating #{movie['title']}"
    base_poster_url = "https://image.tmdb.org/t/p/original"
    Movie.create(
      title: movie["title"],
      overview: movie["overview"],
      poster_url: "#{base_poster_url}#{movie["backdrop_path"]}",
      rating: movie["vote_average"]
    )
  end
end

puts 'Tout fini!'
