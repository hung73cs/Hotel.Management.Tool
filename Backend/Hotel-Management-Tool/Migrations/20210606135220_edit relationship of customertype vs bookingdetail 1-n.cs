using Microsoft.EntityFrameworkCore.Migrations;

namespace Hotel.Management.Tool.Migrations
{
    public partial class editrelationshipofGuesttypevsBilldetail1n : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_BillDetails_GuestTypeId",
                table: "BillDetails");

            migrationBuilder.CreateIndex(
                name: "IX_BillDetails_GuestTypeId",
                table: "BillDetails",
                column: "GuestTypeId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_BillDetails_GuestTypeId",
                table: "BillDetails");

            migrationBuilder.CreateIndex(
                name: "IX_BillDetails_GuestTypeId",
                table: "BillDetails",
                column: "GuestTypeId",
                unique: true);
        }
    }
}
