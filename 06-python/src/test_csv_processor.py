#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
Tests for CSV Processor Assignment
Module 06 - Python Fundamentals
"""

import pytest
import csv
import os
import tempfile
from csv_processor import (
    load_census_data,
    get_total_population,
    find_largest_community,
    find_smallest_community,
    get_communities_by_sector,
    calculate_average_population,
    get_population_stats,
    find_communities_above_threshold,
    export_to_csv
)


@pytest.fixture
def sample_census_data():
    """Create sample census data for testing"""
    return [
        {'NAME': 'Community A', 'Total Population': '10,000', 'Sector': 'Northwest'},
        {'NAME': 'Community B', 'Total Population': '25,000', 'Sector': 'Northeast'},
        {'NAME': 'Community C', 'Total Population': '5,000', 'Sector': 'Northwest'},
        {'NAME': 'Community D', 'Total Population': '15,000', 'Sector': 'Southeast'},
        {'NAME': 'Community E', 'Total Population': '8,000', 'Sector': 'Southwest'},
    ]


@pytest.fixture
def temp_csv_file(sample_census_data):
    """Create a temporary CSV file with sample data"""
    fd, path = tempfile.mkstemp(suffix='.csv')
    os.close(fd)
    
    with open(path, 'w', newline='', encoding='utf-8') as file:
        writer = csv.DictWriter(file, fieldnames=['NAME', 'Total Population', 'Sector'])
        writer.writeheader()
        writer.writerows(sample_census_data)
    
    yield path
    
    if os.path.exists(path):
        os.remove(path)


class TestLoadCensusData:
    """Tests for load_census_data function"""
    
    def test_load_existing_file(self, temp_csv_file):
        data = load_census_data(temp_csv_file)
        assert data is not None
        assert len(data) == 5
        assert data[0]['NAME'] == 'Community A'
    
    def test_load_nonexistent_file(self):
        data = load_census_data("nonexistent.csv")
        assert data is None
    
    def test_loaded_data_structure(self, temp_csv_file):
        data = load_census_data(temp_csv_file)
        assert isinstance(data, list)
        assert isinstance(data[0], dict)
        assert 'NAME' in data[0]
        assert 'Total Population' in data[0]


class TestGetTotalPopulation:
    """Tests for get_total_population function"""
    
    def test_total_population(self, sample_census_data):
        total = get_total_population(sample_census_data)
        # 10,000 + 25,000 + 5,000 + 15,000 + 8,000 = 63,000
        assert total == 63000
    
    def test_empty_data(self):
        assert get_total_population([]) == 0
    
    def test_none_data(self):
        assert get_total_population(None) == 0


class TestFindLargestCommunity:
    """Tests for find_largest_community function"""
    
    def test_find_largest(self, sample_census_data):
        largest = find_largest_community(sample_census_data)
        assert largest is not None
        assert largest['NAME'] == 'Community B'
        assert largest['Total Population'] == '25,000'
    
    def test_empty_data(self):
        result = find_largest_community([])
        assert result is None
    
    def test_single_community(self):
        data = [{'NAME': 'Only One', 'Total Population': '5,000'}]
        largest = find_largest_community(data)
        assert largest['NAME'] == 'Only One'


class TestFindSmallestCommunity:
    """Tests for find_smallest_community function"""
    
    def test_find_smallest(self, sample_census_data):
        smallest = find_smallest_community(sample_census_data)
        assert smallest is not None
        assert smallest['NAME'] == 'Community C'
        assert smallest['Total Population'] == '5,000'
    
    def test_empty_data(self):
        result = find_smallest_community([])
        assert result is None
    
    def test_ignores_zero_population(self):
        data = [
            {'NAME': 'Community A', 'Total Population': '0'},
            {'NAME': 'Community B', 'Total Population': '5,000'},
        ]
        smallest = find_smallest_community(data)
        assert smallest['NAME'] == 'Community B'


class TestGetCommunitiesBySector:
    """Tests for get_communities_by_sector function"""
    
    def test_filter_by_sector(self, sample_census_data):
        northwest = get_communities_by_sector(sample_census_data, 'Northwest')
        assert len(northwest) == 2
        assert northwest[0]['NAME'] == 'Community A'
        assert northwest[1]['NAME'] == 'Community C'
    
    def test_case_insensitive(self, sample_census_data):
        result = get_communities_by_sector(sample_census_data, 'northwest')
        assert len(result) == 2
    
    def test_no_matches(self, sample_census_data):
        result = get_communities_by_sector(sample_census_data, 'NonExistent')
        assert result == []
    
    def test_empty_data(self):
        result = get_communities_by_sector([], 'Northwest')
        assert result == []


class TestCalculateAveragePopulation:
    """Tests for calculate_average_population function"""
    
    def test_calculate_average(self, sample_census_data):
        # Total: 63,000 / 5 communities = 12,600
        average = calculate_average_population(sample_census_data)
        assert average == 12600.0
    
    def test_empty_data(self):
        assert calculate_average_population([]) == 0.0
    
    def test_single_community(self):
        data = [{'NAME': 'Only One', 'Total Population': '10,000'}]
        average = calculate_average_population(data)
        assert average == 10000.0


class TestGetPopulationStats:
    """Tests for get_population_stats function"""
    
    def test_stats_structure(self, sample_census_data):
        stats = get_population_stats(sample_census_data)
        
        assert 'total' in stats
        assert 'average' in stats
        assert 'max' in stats
        assert 'max_community' in stats
        assert 'min' in stats
        assert 'min_community' in stats
        assert 'count' in stats
    
    def test_stats_values(self, sample_census_data):
        stats = get_population_stats(sample_census_data)
        
        assert stats['total'] == 63000
        assert stats['average'] == 12600.0
        assert stats['max'] == 25000
        assert stats['max_community'] == 'Community B'
        assert stats['min'] == 5000
        assert stats['min_community'] == 'Community C'
        assert stats['count'] == 5
    
    def test_stats_empty_data(self):
        result = get_population_stats([])
        assert result is None


class TestFindCommunitiesAboveThreshold:
    """Tests for find_communities_above_threshold function"""
    
    def test_above_threshold(self, sample_census_data):
        # Threshold: 10,000
        # Should find: B (25k), D (15k), and A (10k)
        result = find_communities_above_threshold(sample_census_data, 10000)
        assert len(result) == 3
    
    def test_high_threshold(self, sample_census_data):
        # Threshold: 20,000
        # Should find: Only B (25k)
        result = find_communities_above_threshold(sample_census_data, 20000)
        assert len(result) == 1
        assert result[0]['NAME'] == 'Community B'
    
    def test_zero_threshold(self, sample_census_data):
        # All communities should match
        result = find_communities_above_threshold(sample_census_data, 0)
        assert len(result) == 5
    
    def test_empty_data(self):
        result = find_communities_above_threshold([], 10000)
        assert result == []


class TestExportToCsv:
    """Tests for export_to_csv function"""
    
    def test_export_all_fields(self, sample_census_data):
        output_file = tempfile.mktemp(suffix='.csv')
        try:
            result = export_to_csv(sample_census_data, output_file)
            assert result == True
            assert os.path.exists(output_file)
            
            # Verify exported data
            with open(output_file, 'r', encoding='utf-8') as file:
                reader = csv.DictReader(file)
                rows = list(reader)
                assert len(rows) == 5
        finally:
            if os.path.exists(output_file):
                os.remove(output_file)
    
    def test_export_specific_fields(self, sample_census_data):
        output_file = tempfile.mktemp(suffix='.csv')
        try:
            fields = ['NAME', 'Total Population']
            result = export_to_csv(sample_census_data, output_file, fields)
            assert result == True
            
            # Verify only specified fields
            with open(output_file, 'r', encoding='utf-8') as file:
                reader = csv.DictReader(file)
                rows = list(reader)
                assert set(rows[0].keys()) == set(fields)
        finally:
            if os.path.exists(output_file):
                os.remove(output_file)
    
    def test_export_empty_data(self):
        output_file = tempfile.mktemp(suffix='.csv')
        result = export_to_csv([], output_file)
        assert result == False
