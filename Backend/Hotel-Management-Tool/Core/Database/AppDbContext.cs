using Hotel.Management.Tool.Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace Hotel.Management.Tool.Core.Database
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }
        public DbSet<Account> Accounts { get; set; }
        public DbSet<Booking> Bookings { get; set; }
        public DbSet<BookingDetail> BookingDetails { get; set; }
        public DbSet<GuestType> GuestTypes { get; set; }
        public DbSet<Room> Rooms { get; set; }
        public DbSet<RoomType> RoomTypes { get; set; }
        public DbSet<UserInfo> UsersInfo { get; set; }
        public DbSet<Parameter> Parameters { get; set; }
        public DbSet<Report> Reports { get; set; }
        public DbSet<ReportDetail> ReportDetails { get; set; }
        public DbSet<Bill> Bills { get; set; }
        public DbSet<BillDetail> BillDetails { get; set; }

        public DbSet<SurchargeRate> SurchargeRates { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Account>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Username).IsRequired();
                entity.Property(e => e.Password).IsRequired();
                entity.Property(e => e.Role).IsRequired();
                entity.Property(e => e.IsDeleted).IsRequired().HasDefaultValue(false);

                entity.HasQueryFilter(x => x.IsDeleted == false);
            });

            modelBuilder.Entity<Booking>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.StartedDate).IsRequired();
                entity.Property(e => e.NumberOfGuest).IsRequired();
                entity.Property(e => e.UnitPrice).IsRequired();
                entity.Property(e => e.UnitStandardPrice).IsRequired();
                entity.Property(e => e.IsDeleted).IsRequired().HasDefaultValue(false);

                entity.HasOne(s => s.Account)
                    .WithMany(g => g.Bookings)
                    .HasForeignKey(s => s.AccountId);

                entity.HasOne(s => s.Room)
                    .WithMany(g => g.Bookings)
                    .HasForeignKey(s => s.RoomId);
                entity.HasQueryFilter(x => x.IsDeleted == false);
            });
            modelBuilder.Entity<BookingDetail>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.GuestName).IsRequired();
                entity.Property(e => e.IdCard).IsRequired();
                entity.Property(e => e.Address).IsRequired();
                entity.Property(e => e.IsDeleted).IsRequired().HasDefaultValue(false);

                entity.HasOne(s => s.Booking)
                    .WithMany(g => g.BookingDetails)
                    .HasForeignKey(s => s.BookingId);

                entity.HasOne(s => s.GuestType)
                  .WithMany(g => g.BookingDetails)
                  .HasForeignKey(s => s.GuestTypeId);

                entity.HasQueryFilter(x => x.IsDeleted == false);
            });
            modelBuilder.Entity<GuestType>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Name).IsRequired();
                entity.Property(e => e.SurchargeRate).IsRequired();
                entity.Property(e => e.IsDeleted).IsRequired().HasDefaultValue(false);

                entity.HasQueryFilter(x => x.IsDeleted == false);
            });
            modelBuilder.Entity<Parameter>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Name).IsRequired();
                entity.Property(e => e.Value).IsRequired();
                entity.Property(e => e.IsDeleted).IsRequired().HasDefaultValue(false);

                entity.HasQueryFilter(x => x.IsDeleted == false);
            });
            modelBuilder.Entity<Room>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Name).IsRequired();
                entity.Property(e => e.RoomStatus).IsRequired();
                entity.Property(e => e.IsDeleted).IsRequired().HasDefaultValue(false);
                entity.HasOne(s => s.RoomType)
                    .WithMany(g => g.Rooms)
                    .HasForeignKey(s => s.RoomTypeId);
                entity.HasQueryFilter(x => x.IsDeleted == false);
            });
            modelBuilder.Entity<RoomType>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Name).IsRequired();
                entity.Property(e => e.Cost).IsRequired();
                entity.Property(e => e.IsDeleted).IsRequired().HasDefaultValue(false);
                entity.HasQueryFilter(x => x.IsDeleted == false);
            });
            modelBuilder.Entity<UserInfo>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Name).IsRequired();
                entity.Property(e => e.Gender).IsRequired();
                entity.Property(d => d.Birthday).IsRequired();
                entity.Property(d => d.PhoneNumber).IsRequired();
                entity.Property(d => d.Address).IsRequired();
                entity.Property(d => d.IdCard).IsRequired();
                entity.Property(e => e.IsDeleted).IsRequired().HasDefaultValue(false);

                entity.HasOne(s => s.Account)
                   .WithOne(g => g.UserInfo)
                   .HasForeignKey<UserInfo>(s => s.AccountId);

                entity.HasQueryFilter(x => x.IsDeleted == false);
            });

            modelBuilder.Entity<Report>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Month).IsRequired();
                entity.Property(e => e.Year).IsRequired();
                entity.Property(e => e.TotalRevenue).IsRequired();
                entity.Property(e => e.IsDeleted).IsRequired().HasDefaultValue(false);
                entity.HasQueryFilter(x => x.IsDeleted == false);
            });

            modelBuilder.Entity<ReportDetail>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Ratio);
                entity.Property(e => e.Revenue).IsRequired();
                entity.Property(e => e.IsDeleted).IsRequired().HasDefaultValue(false);

                entity.HasOne(s => s.Report)
                 .WithMany(p => p.ReportDetails)
                 .HasForeignKey(f => f.ReportId);

                entity.HasOne(s => s.RoomType)
                  .WithOne(g => g.ReportDetail)
                  .HasForeignKey<ReportDetail>(s => s.RomTypeId);
                entity.HasQueryFilter(x => x.IsDeleted == false);
            });

            modelBuilder.Entity<Bill>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.CreatedDate).IsRequired();
                entity.Property(e => e.Address);
                entity.Property(e => e.TotalPrice).IsRequired();
                entity.Property(e => e.IsDeleted).IsRequired().HasDefaultValue(false);
                entity.HasQueryFilter(x => x.IsDeleted == false);
            });

            modelBuilder.Entity<BillDetail>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.NumberOfRentalDays).IsRequired();
                entity.Property(e => e.UnitPrice);
                entity.Property(e => e.Price).IsRequired();
                entity.Property(e => e.IsDeleted).IsRequired().HasDefaultValue(false);

                entity.HasOne(s => s.Bill)
                 .WithMany(p => p.BillDetails)
                 .HasForeignKey(f => f.BillId);

                entity.HasOne(s => s.Booking)
                  .WithOne(g => g.BillDetail)
                  .HasForeignKey<BillDetail>(s => s.BookingId);
                entity.HasQueryFilter(x => x.IsDeleted == false);
            });

            modelBuilder.Entity<SurchargeRate>(entity =>
            {
                entity.HasKey(e => e.GuestLevel);
                entity.Property(e => e.Rate).IsRequired();
                entity.Property(e => e.IsDeleted).IsRequired().HasDefaultValue(false);
                entity.HasQueryFilter(x => x.IsDeleted == false);
            });
        }
    }
}
