using Microsoft.EntityFrameworkCore.Migrations;

namespace Hotel.Management.Tool.Migrations
{
    public partial class editrelationshipofGuesttypevsbookingdetail1n : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_BookingDetails_GuestTypeId",
                table: "BookingDetails");

            migrationBuilder.CreateIndex(
                name: "IX_BookingDetails_GuestTypeId",
                table: "BookingDetails",
                column: "GuestTypeId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_BookingDetails_GuestTypeId",
                table: "BookingDetails");

            migrationBuilder.CreateIndex(
                name: "IX_BookingDetails_GuestTypeId",
                table: "BookingDetails",
                column: "GuestTypeId",
                unique: true);
        }
    }
}
