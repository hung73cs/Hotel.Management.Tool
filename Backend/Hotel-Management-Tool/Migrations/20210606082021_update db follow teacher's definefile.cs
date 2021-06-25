using Microsoft.EntityFrameworkCore.Migrations;
using System;

namespace Hotel.Management.Tool.Migrations
{
    public partial class updatedbfollowteachersdefinefile : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_BillDetails_BillId",
                table: "BillDetails");

            migrationBuilder.DropColumn(
                name: "ReportDateTime",
                table: "Reports");

            migrationBuilder.DropColumn(
                name: "GuestId",
                table: "Bills");

            migrationBuilder.DropColumn(
                name: "EndedDate",
                table: "Bills");

            migrationBuilder.DropColumn(
                name: "IsPaid",
                table: "Bills");

            migrationBuilder.DropColumn(
                name: "Price",
                table: "Bills");

            migrationBuilder.DropColumn(
                name: "Cost",
                table: "BillDetails");

            migrationBuilder.DropColumn(
                name: "Promotion",
                table: "BillDetails");

            migrationBuilder.DropColumn(
                name: "Surcharge",
                table: "BillDetails");

            migrationBuilder.AddColumn<int>(
                name: "Month",
                table: "Reports",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<decimal>(
                name: "TotalRevenue",
                table: "Reports",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<int>(
                name: "Year",
                table: "Reports",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "NumberOfGuest",
                table: "Bills",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<decimal>(
                name: "UnitPrice",
                table: "Bills",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "UnitStandardPrice",
                table: "Bills",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "BillDetails",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "GuestName",
                table: "BillDetails",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<Guid>(
                name: "GuestTypeId",
                table: "BillDetails",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<string>(
                name: "IdCard",
                table: "BillDetails",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "Bills",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    IsDeleted = table.Column<bool>(nullable: false, defaultValue: false),
                    CreatedDate = table.Column<DateTime>(nullable: false),
                    GuestName = table.Column<string>(nullable: true),
                    Address = table.Column<string>(nullable: true),
                    TotalPrice = table.Column<decimal>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Bills", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "BillDetails",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    IsDeleted = table.Column<bool>(nullable: false, defaultValue: false),
                    BillId = table.Column<Guid>(nullable: false),
                    BookingId = table.Column<Guid>(nullable: false),
                    NumberOfRentalDays = table.Column<int>(nullable: false),
                    UnitPrice = table.Column<decimal>(nullable: false),
                    Price = table.Column<decimal>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BillDetails", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BillDetails_Bills_BillId",
                        column: x => x.BillId,
                        principalTable: "Bills",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BillDetails_Bills_BillId",
                        column: x => x.BillId,
                        principalTable: "Bills",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BillDetails_BillId",
                table: "BillDetails",
                column: "BillId");

            migrationBuilder.CreateIndex(
                name: "IX_BillDetails_GuestTypeId",
                table: "BillDetails",
                column: "GuestTypeId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_BillDetails_BillId",
                table: "BillDetails",
                column: "BillId");

            migrationBuilder.CreateIndex(
                name: "IX_BillDetails_BillId",
                table: "BillDetails",
                column: "BillId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_BillDetails_GuestTypes_GuestTypeId",
                table: "BillDetails",
                column: "GuestTypeId",
                principalTable: "GuestTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BillDetails_GuestTypes_GuestTypeId",
                table: "BillDetails");

            migrationBuilder.DropTable(
                name: "BillDetails");

            migrationBuilder.DropTable(
                name: "Bills");

            migrationBuilder.DropIndex(
                name: "IX_BillDetails_BillId",
                table: "BillDetails");

            migrationBuilder.DropIndex(
                name: "IX_BillDetails_GuestTypeId",
                table: "BillDetails");

            migrationBuilder.DropColumn(
                name: "Month",
                table: "Reports");

            migrationBuilder.DropColumn(
                name: "TotalRevenue",
                table: "Reports");

            migrationBuilder.DropColumn(
                name: "Year",
                table: "Reports");

            migrationBuilder.DropColumn(
                name: "NumberOfGuest",
                table: "Bills");

            migrationBuilder.DropColumn(
                name: "UnitPrice",
                table: "Bills");

            migrationBuilder.DropColumn(
                name: "UnitStandardPrice",
                table: "Bills");

            migrationBuilder.DropColumn(
                name: "Address",
                table: "BillDetails");

            migrationBuilder.DropColumn(
                name: "GuestName",
                table: "BillDetails");

            migrationBuilder.DropColumn(
                name: "GuestTypeId",
                table: "BillDetails");

            migrationBuilder.DropColumn(
                name: "IdCard",
                table: "BillDetails");

            migrationBuilder.AddColumn<DateTime>(
                name: "ReportDateTime",
                table: "Reports",
                type: "timestamp without time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<Guid>(
                name: "GuestId",
                table: "Bills",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<DateTime>(
                name: "EndedDate",
                table: "Bills",
                type: "timestamp without time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<bool>(
                name: "IsPaid",
                table: "Bills",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<decimal>(
                name: "Price",
                table: "Bills",
                type: "numeric",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "Cost",
                table: "BillDetails",
                type: "numeric",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "Promotion",
                table: "BillDetails",
                type: "numeric",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "Surcharge",
                table: "BillDetails",
                type: "numeric",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.CreateIndex(
                name: "IX_BillDetails_BillId",
                table: "BillDetails",
                column: "BillId",
                unique: true);
        }
    }
}
