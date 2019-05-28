using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace LocalCommunityVotingPlatform.Migrations
{
    public partial class AddedResolutionTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ChosenOption",
                table: "Votes",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DateOfVoting",
                table: "Votes",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "ActiveToVoteBeforeDate",
                table: "Resolutions",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "Date",
                table: "Resolutions",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Resolutions",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Indexer",
                table: "Resolutions",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Title",
                table: "Resolutions",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ChosenOption",
                table: "Votes");

            migrationBuilder.DropColumn(
                name: "DateOfVoting",
                table: "Votes");

            migrationBuilder.DropColumn(
                name: "ActiveToVoteBeforeDate",
                table: "Resolutions");

            migrationBuilder.DropColumn(
                name: "Date",
                table: "Resolutions");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "Resolutions");

            migrationBuilder.DropColumn(
                name: "Indexer",
                table: "Resolutions");

            migrationBuilder.DropColumn(
                name: "Title",
                table: "Resolutions");
        }
    }
}
