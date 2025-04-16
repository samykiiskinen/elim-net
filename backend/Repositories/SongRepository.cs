using backend.Data;
using backend.Models;
using backend.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
    public class SongRepository : ISongRepository
    {
        private readonly AppDbContext _context;

        public SongRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Song>> GetAllSongsAsync()
        {
            return await _context.Songs.ToListAsync();
        }

        public async Task<Song> GetSongByIdAsync(int id)
        {
            var song = await _context.Songs.FindAsync(id);
            if (song == null)
            {
                throw new KeyNotFoundException($"Song not found");
            }
            return song;
        }

        public async Task AddSongAsync(Song song)
        {
            _context.Songs.Add(song);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteSongAsync(int songId)
        {
            var song = _context.Songs.FirstOrDefault(s => s.Id == songId);
            if (song == null)
            {
                throw new KeyNotFoundException("Song not found");
            }
            _context.Songs.Remove(song);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateSongAsync(Song song)
        {
            _context.Songs.Update(song);
            await _context.SaveChangesAsync();
        }

        public async Task ReplaceSongAsync(Song song)
        {
            _context.Songs.Update(song);
            await _context.SaveChangesAsync();
        }
    }
}
