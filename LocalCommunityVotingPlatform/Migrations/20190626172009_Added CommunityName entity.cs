using Microsoft.EntityFrameworkCore.Migrations;

namespace LocalCommunityVotingPlatform.Migrations
{
    public partial class AddedCommunityNameentity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CommunityName",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    NameOfLocalCommunity = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CommunityName", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "1a5dc5b1-e65c-4b46-b3da-06d6220b7569", "f9a977f2-c909-4548-8a77-db519bdd8cab", "Admin", "ADMIN" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CommunityName");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1a5dc5b1-e65c-4b46-b3da-06d6220b7569");
        }
    }
}
