
import React, { useEffect, useState } from 'react';
import { supabase } from '../../../services/mockSupabase';
import { Idea } from '../../../types';

const IdeasPage: React.FC = () => {
    const [ideas, setIdeas] = useState<Idea[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchIdeas = async () => {
            setLoading(true);
            const { data } = await supabase.from('ideas').select('*');
            if (data) setIdeas(data);
            setLoading(false);
        };
        fetchIdeas();
    }, []);

    if (loading) return <div className="text-center p-8">Loading ideas...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-200">Ideas & Mood Board</h2>
                <button className="px-4 py-2 font-medium text-white bg-primary rounded-md hover:bg-primary-dark">
                    Add New Idea
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ideas.map(idea => (
                    <div key={idea.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden group">
                        {idea.imageUrl && (
                            <img src={idea.imageUrl} alt={idea.title} className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" />
                        )}
                        <div className="p-4">
                            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">{idea.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">{idea.content}</p>
                            <div className="mt-4 flex flex-wrap gap-2">
                                {idea.tags.map(tag => (
                                    <span key={tag} className="px-2 py-1 text-xs font-semibold text-red-800 bg-red-100 dark:text-red-200 dark:bg-red-900/50 rounded-full">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default IdeasPage;
