import React, { useState, useEffect } from 'react';
import { Download, Calendar, DollarSign, Package, LogOut, User } from 'lucide-react';
import { supabase } from '../supabaseClient';
import { mockPurchases } from '../data/purchases';
import { User as SupabaseUser } from '@supabase/supabase-js';

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('purchases');

  useEffect(() => {
    // Supabaseのセッションからユーザー情報を取得
    const getUser = async () => {
      setIsLoading(true);
      const { data, error } = await supabase.auth.getUser();
      if (data.user) {
        setUser(data.user);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    };

    getUser();

    // 認証状態の変化を監視
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser(session.user);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('ログアウトエラー:', error);
        alert('ログアウト中にエラーが発生しました');
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('ログアウトエラー:', error);
      alert('ログアウト中にエラーが発生しました');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">読み込み中...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">ログインが必要です</h2>
          <p className="text-gray-600 mb-6">ダッシュボードにアクセスするにはログインしてください。</p>
          <button
            onClick={() => window.location.href = '/login'}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            ログインページへ
          </button>
        </div>
      </div>
    );
  }

  const userPurchases = mockPurchases.filter(purchase => purchase.userId === user.id);
  const totalSpent = userPurchases.reduce((sum, purchase) => sum + purchase.amount, 0);

  const handleDownload = (downloadUrl: string, productName: string) => {
    // In a real app, this would initiate the download
    alert(`Download started for: ${productName}`);
  };

  const getUserDisplayName = () => {
    if (user.user_metadata?.full_name) {
      return user.user_metadata.full_name;
    }
    if (user.user_metadata?.name) {
      return user.user_metadata.name;
    }
    return user.email?.split('@')[0] || 'ユーザー';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with User Info and Logout */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <div className="bg-purple-100 p-3 rounded-full">
              <User className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{getUserDisplayName()}</h1>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span>ログアウト</span>
          </button>
        </div>

        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white p-8 mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {getUserDisplayName()}!</h1>
          <p className="text-purple-100">Manage your purchases and downloads here.</p>
          <div className="mt-4 text-sm text-purple-200">
            <p>ユーザーID: {user.id}</p>
            <p>アカウント作成日: {new Date(user.created_at).toLocaleDateString('ja-JP')}</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Package className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Purchases</p>
                <p className="text-2xl font-bold text-gray-900">{userPurchases.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-lg">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Spent</p>
                <p className="text-2xl font-bold text-gray-900">${totalSpent.toFixed(2)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Download className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Available Downloads</p>
                <p className="text-2xl font-bold text-gray-900">{userPurchases.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('purchases')}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'purchases'
                    ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                My Purchases
              </button>
              <button
                onClick={() => setActiveTab('downloads')}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'downloads'
                    ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                Downloads
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'purchases' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Purchase History</h2>
                {userPurchases.length > 0 ? (
                  <div className="space-y-4">
                    {userPurchases.map((purchase) => (
                      <div key={purchase.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <img
                              src={purchase.product.imageUrl}
                              alt={purchase.product.name}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                            <div>
                              <h3 className="font-semibold text-gray-900">
                                {purchase.product.name}
                              </h3>
                              <p className="text-gray-600">
                                {purchase.product.shortDescription}
                              </p>
                              <div className="flex items-center text-sm text-gray-500 mt-1">
                                <Calendar className="h-4 w-4 mr-1" />
                                {new Date(purchase.purchaseDate).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">
                              ${purchase.amount.toFixed(2)}
                            </p>
                            <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded-full">
                              Completed
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No purchases yet</h3>
                    <p className="text-gray-600">Start shopping to see your purchase history here.</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'downloads' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Available Downloads</h2>
                {userPurchases.length > 0 ? (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {userPurchases.map((purchase) => (
                      <div key={purchase.id} className="border border-gray-200 rounded-lg p-4">
                        <img
                          src={purchase.product.imageUrl}
                          alt={purchase.product.name}
                          className="w-full h-32 object-cover rounded-lg mb-4"
                        />
                        <h3 className="font-semibold text-gray-900 mb-2">
                          {purchase.product.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                          {purchase.product.shortDescription}
                        </p>
                        <button
                          onClick={() => handleDownload(purchase.product.downloadUrl, purchase.product.name)}
                          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors"
                        >
                          <Download className="h-4 w-4" />
                          <span>Download</span>
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Download className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No downloads available</h3>
                    <p className="text-gray-600">Purchase products to access your downloads here.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;