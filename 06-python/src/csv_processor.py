#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
CSV Processing Assignment
Module 06 - Python Fundamentals

Process Calgary census data from 2018.
"""

import csv
import os


def load_census_data(filename):
    """
    Load census data from CSV file.
    
    Args:
        filename: Path to CSV file
    
    Returns:
        List of dictionaries (one per community), or None if error
        
    Examples:
        >>> data = load_census_data("Census_by_Community_2018.csv")
        >>> len(data)
        100
    """
    try:
        communities = []
        with open(filename, 'r', encoding='utf-8') as file:
            reader = csv.DictReader(file)
            for row in reader:
                communities.append(row)
        return communities
    except FileNotFoundError:
        return None
    except Exception as e:
        print(f"Error loading census data: {e}")
        return None


def get_total_population(data):
    """
    Calculate total population across all communities.
    
    Args:
        data: List of community dictionaries
    
    Returns:
        Total population as integer
        
    Examples:
        >>> get_total_population(data)
        1267344
    """
    if not data:
        return 0
    
    total = 0
    for community in data:
        pop = community.get('Total Population', '0')
        # Remove commas and convert to int
        try:
            pop_clean = pop.replace(',', '') if isinstance(pop, str) else str(pop)
            total += int(pop_clean)
        except (ValueError, AttributeError):
            continue
    
    return total


def find_largest_community(data):
    """
    Find community with largest population.
    
    Args:
        data: List of community dictionaries
    
    Returns:
        Dictionary of largest community, or None
        
    Examples:
        >>> largest = find_largest_community(data)
        >>> largest['NAME']
        'Downtown'
    """
    if not data:
        return None
    
    largest = None
    max_pop = 0
    
    for community in data:
        pop = community.get('Total Population', '0')
        try:
            pop_clean = pop.replace(',', '') if isinstance(pop, str) else str(pop)
            pop_int = int(pop_clean)
            if pop_int > max_pop:
                max_pop = pop_int
                largest = community
        except (ValueError, AttributeError):
            continue
    
    return largest


def find_smallest_community(data):
    """
    Find community with smallest non-zero population.
    
    Args:
        data: List of community dictionaries
    
    Returns:
        Dictionary of smallest community, or None
        
    Examples:
        >>> smallest = find_smallest_community(data)
        >>> smallest['NAME']
        'Rural Area'
    """
    if not data:
        return None
    
    smallest = None
    min_pop = float('inf')
    
    for community in data:
        pop = community.get('Total Population', '0')
        try:
            pop_clean = pop.replace(',', '') if isinstance(pop, str) else str(pop)
            pop_int = int(pop_clean)
            if pop_int > 0 and pop_int < min_pop:
                min_pop = pop_int
                smallest = community
        except (ValueError, AttributeError):
            continue
    
    return smallest


def get_communities_by_sector(data, sector):
    """
    Filter communities by sector.
    
    Args:
        data: List of community dictionaries
        sector: Sector name to filter by
    
    Returns:
        List of communities in that sector
        
    Examples:
        >>> northwest = get_communities_by_sector(data, "Northwest")
        >>> len(northwest)
        25
    """
    if not data:
        return []
    
    filtered = []
    for community in data:
        community_sector = community.get('Sector', '').strip()
        if community_sector.lower() == sector.lower():
            filtered.append(community)
    
    return filtered


def calculate_average_population(data):
    """
    Calculate average population per community.
    
    Args:
        data: List of community dictionaries
    
    Returns:
        Average population (float)
        
    Examples:
        >>> calculate_average_population(data)
        8500.5
    """
    if not data:
        return 0.0
    
    total = get_total_population(data)
    return total / len(data) if len(data) > 0 else 0.0


def get_population_stats(data):
    """
    Get comprehensive population statistics.
    
    Args:
        data: List of community dictionaries
    
    Returns:
        Dictionary with total, average, min, max, count
        
    Examples:
        >>> stats = get_population_stats(data)
        >>> stats['total']
        1267344
    """
    if not data:
        return None
    
    total = get_total_population(data)
    largest = find_largest_community(data)
    smallest = find_smallest_community(data)
    average = calculate_average_population(data)
    
    return {
        'total': total,
        'average': round(average, 2),
        'max': int(largest.get('Total Population', '0').replace(',', '')) if largest else 0,
        'max_community': largest.get('NAME', 'Unknown') if largest else None,
        'min': int(smallest.get('Total Population', '0').replace(',', '')) if smallest else 0,
        'min_community': smallest.get('NAME', 'Unknown') if smallest else None,
        'count': len(data)
    }


def find_communities_above_threshold(data, threshold):
    """
    Find all communities with population above threshold.
    
    Args:
        data: List of community dictionaries
        threshold: Minimum population
    
    Returns:
        List of communities above threshold
        
    Examples:
        >>> large = find_communities_above_threshold(data, 10000)
        >>> len(large)
        15
    """
    if not data:
        return []
    
    result = []
    for community in data:
        pop = community.get('Total Population', '0')
        try:
            pop_clean = pop.replace(',', '') if isinstance(pop, str) else str(pop)
            if int(pop_clean) >= threshold:
                result.append(community)
        except (ValueError, AttributeError):
            continue
    
    return result


def export_to_csv(data, filename, fields=None):
    """
    Export data to a new CSV file.
    
    Args:
        data: List of dictionaries
        filename: Output file path
        fields: List of fields to export (None = all fields)
    
    Returns:
        True if successful, False otherwise
        
    Examples:
        >>> export_to_csv(filtered_data, "output.csv", ["NAME", "Total Population"])
        True
    """
    if not data:
        return False
    
    try:
        # Determine fields
        if fields is None:
            fields = list(data[0].keys()) if data else []
        
        with open(filename, 'w', newline='', encoding='utf-8') as file:
            writer = csv.DictWriter(file, fieldnames=fields)
            writer.writeheader()
            for row in data:
                # Only write specified fields
                filtered_row = {k: row.get(k, '') for k in fields}
                writer.writerow(filtered_row)
        
        return True
    except Exception as e:
        print(f"Error exporting to CSV: {e}")
        return False


if __name__ == "__main__":
    # Test with census data if available
    csv_file = "Census_by_Community_2018.csv"
    
    if os.path.exists(csv_file):
        print("Calgary Census Data Analysis")
        print("=" * 50)
        
        data = load_census_data(csv_file)
        if data:
            stats = get_population_stats(data)
            print(f"\nTotal communities: {stats['count']}")
            print(f"Total population: {stats['total']:,}")
            print(f"Average population: {stats['average']:,.2f}")
            print(f"Largest: {stats['max_community']} ({stats['max']:,})")
            print(f"Smallest: {stats['min_community']} ({stats['min']:,})")
    else:
        print(f"Census data file not found: {csv_file}")
        print("Please ensure the file is in the current directory.")
